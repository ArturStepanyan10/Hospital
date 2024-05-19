'use client'

import React, { useEffect, useState } from 'react';
import { Patient } from '../../../../interfaces/patient.interface';
import styles from './dataPatient.module.css';
import { Admission } from '../../../../interfaces/admission.interface';
import { getCookie } from '../../../../utils/setCookie';
import { decodeJWTToken } from '../../../../utils/decodeJWT';
import { MedicalReport } from '../../../../interfaces/medicalReport.interface';

const DataPatient = ({ params }: { params: { id: number } }) => {
    const [patient, setPatient] = useState<Patient>();
    const [admissions, setAdmissions] = useState<Admission[]>([]);
    const [doctorId, setDoctorId] = useState<number | null>(null);
    const [medreport, setMedReport] = useState<MedicalReport[]>([]);

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
            if (!patient || !doctorId) return;

            try {
                const response = await fetch(`http://localhost:8080/api/admissions/searchByPatient/${patient.id}`);

                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }

                const admissionsData = await response.json();

                const filteredAdmissions = admissionsData.filter((admission: { doctorId: number; }) => admission.doctorId === doctorId);
                setAdmissions(filteredAdmissions);
            } catch (error) {
                console.error('Error fetching admissions:', error);
            }
        };

        fetchAdmissionsByPatient();
    }, [patient, doctorId]);

    useEffect(() => {
        const fetchReportByPatient = async () => {
            if (!patient || !doctorId) return;

            try {
                const response = await fetch(`http://localhost:8080/api/medical-reports/searchByPatient/${patient.id}`);

                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }

                const admissionsData = await response.json();

                const filteredAdmissions = admissionsData.filter((admission: { doctorId: number; }) => admission.doctorId === doctorId);
                setMedReport(filteredAdmissions);
            } catch (error) {
                console.error('Error fetching admissions:', error);
            }
        };

        fetchReportByPatient();
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
                                    {medreport.map(report => (
                                        <div key={report.id}>
                                            <p>Жалобы/Заключение: {report.report}</p>
                                        </div>
                                    ))}

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