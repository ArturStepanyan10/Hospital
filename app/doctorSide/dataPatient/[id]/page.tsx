'use client'

import React, { useEffect, useState } from 'react';
import { Patient } from '../../../../interfaces/patient.interface';
import styles from './dataPatient.module.css';
import { Admission } from '../../../../interfaces/admission.interface';
import { getCookie } from '../../../../utils/setCookie';
import { decodeJWTToken } from '../../../../utils/decodeJWT';

const DataPatient = ({ params }: { params: { id: number } }) => {
    const [patient, setPatient] = useState<Patient>();
    const [admissions, setAdmissions] = useState<Admission[]>([]);
    const [doctorId, setDoctorId] = useState<number | null>(null);

    useEffect(() => {
        const fetchPatient = async () => {
            const token = getCookie("accessToken");
            if (!token) return;

            try {
                const decodedToken = decodeJWTToken(token);
                const response = await fetch(`http://localhost:8080/api/patient/search/${params.id}`);

                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }

                const patientData = await response.json();
                setPatient(patientData);

                // Получаем ID врача из токена и обновляем состояние
                const doctorId = decodedToken.id;
                setDoctorId(doctorId);
            } catch (error) {
                console.error('Error fetching patient:', error);
            }
        };

        fetchPatient();
    }, [params.id]);

    useEffect(() => {
        const fetchAdmissionsByPatient = async () => {
            if (!patient || !doctorId) return; // Проверяем наличие пациента и ID врача перед запросом

            try {
                const response = await fetch(`http://localhost:8080/api/admissions/searchByPatient/${patient.id}`);

                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }

                const admissionsData = await response.json();
                // Фильтруем приемы по ID врача
                const filteredAdmissions = admissionsData.filter((admission: { doctorId: number; }) => admission.doctorId === doctorId);
                setAdmissions(filteredAdmissions);
            } catch (error) {
                console.error('Error fetching admissions:', error);
            }
        };

        fetchAdmissionsByPatient();
    }, [patient, doctorId]);



    const isPastAppointment = (dateString: string | number | Date) => {
        const appointmentDate = new Date(dateString);
        const currentDate = new Date();
        return appointmentDate < currentDate;
    };

    return (
        <div>
            <div className={styles.cardPatient}>
                <h2>Пациент: {patient?.lastName} {patient?.firstName}</h2>
                <p className={styles.patientinfo}>Возраст: {patient?.age} лет</p>
                <p className={styles.patientinfo}>СНИЛС: {patient?.snils}</p>
                <p className={styles.patientinfo}>Номер телефона: {patient?.phoneNumber}</p>

                <div className={styles.appointments}>
                    <br />
                    <h2>Ближайшие приемы:</h2>
                    {admissions.map(admission => (
                        <div key={admission.id}>
                            {!isPastAppointment(admission.date) && (
                                <div>
                                    <p>Дата и время: {new Date(admission.date).toLocaleDateString()} {admission.time.toString()}</p>
                                </div>
                            )}
                        </div>
                    ))}
                </div>

                <div className={styles.pastAppointments}>
                    <br />
                    <h2>Прошедшие приемы:</h2>
                    {admissions.map(admission => (
                        <div key={admission.id}>
                            {isPastAppointment(admission.date) && (
                                <div>
                                    <p>Дата и время: {new Date(admission.date).toLocaleDateString()} {admission.time.toString()}</p>
                                    <p>Жалобы/Заключение: </p>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default DataPatient;