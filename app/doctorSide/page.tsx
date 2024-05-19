'use client'

import React, { useEffect, useState } from 'react';
import { Patient } from '../../interfaces/patient.interface';
import { getCookie } from '../../utils/setCookie';
import { decodeJWTToken } from '../../utils/decodeJWT';
import { Admission } from '../../interfaces/admission.interface';
import styles from './page.module.css';
import Link from 'next/link';
import { Button } from '../../components';

const DoctorPage = () => {
    const [patients, setPatients] = useState<Patient[]>([]);
    const [admissions, setAdmissions] = useState<Admission[]>([]);
    const isUserLoggedIn = !!getCookie("accessToken");
    console.log(isUserLoggedIn);

    useEffect(() => {
        const fetchData = async () => {
            const token = getCookie("accessToken");
            if (!token) return;

            try {
                const decodedToken = decodeJWTToken(token);
                const response = await fetch("http://localhost:8080/api/admissions/all");
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                const data = await response.json();
                setAdmissions(data);

                const doctorAdmissions = data.filter((admission: { doctorId: number; }) => admission.doctorId === decodedToken.id);

                // Получение информации о пациентах поочередно для каждого приема
                const patientsData = [];
                for (const admission of doctorAdmissions) {
                    const patientResponse = await fetch(`http://localhost:8080/api/patient/search/${admission.patientId}`);
                    if (!patientResponse.ok) {
                        throw new Error(`HTTP error! Status: ${patientResponse.status}`);
                    }
                    const patientData = await patientResponse.json();
                    patientsData.push(patientData);
                }
                setPatients(patientsData);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    const uniquePatients = patients.filter((patient, index) =>
        patients.findIndex(p => p.id === patient.id) === index
    );

    return (
        <>
            <h1>Пациенты</h1>
            <div>
                {uniquePatients.map((patient, index) => (
                    <div key={index} className={styles.patientCard}>
                        <h2 className={styles.patientName}>{patient.firstName} {patient.lastName}</h2>
                        <p className={styles.patientText}>Возраст: {patient.age}</p>
                        <p className={styles.patientText}>СНИЛС: {patient.snils}</p>
                        <p className={styles.patientText}>Номер телефона: {patient.phoneNumber}</p>
                        {isUserLoggedIn ? (<Link href={`doctorSide/dataPatient/${patient.id}`}>
                            <Button className={styles.button} appearance='primary'>
                                Полные данные
                            </Button></Link>) : (
                            <Link href='../sign-in/'>
                                <Button className={styles.button} appearance='primary'>
                                    Полные данные
                                </Button></Link>
                        )}
                        {isUserLoggedIn ? (<Link href={`doctorSide/createAdmission/${patient.id}`}><Button className={styles.admission} appearance='primary'>
                            Провести прием
                        </Button></Link>) : (<Link href='../sign-in'><Button className={styles.admission} appearance='primary'>
                            Провести прием
                        </Button></Link>)}
                    </div>
                ))}
            </div>
        </>
    );
};

export default DoctorPage;
