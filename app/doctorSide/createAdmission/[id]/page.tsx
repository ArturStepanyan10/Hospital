'use client'


import { useEffect, useState } from 'react';
import styles from './createAdmission.module.css'
import { getCookie } from '../../../../utils/setCookie';
import { decodeJWTToken } from '../../../../utils/decodeJWT';
import { MedicalReport } from '../../../../interfaces/medicalReport.interface';
import { Button } from '../../../../components';
import { Patient } from '../../../../interfaces/patient.interface';
import { Admission } from '../../../../interfaces/admission.interface';
import { Scheds } from '../../../../interfaces/scheds.interface';
import { format } from 'date-fns';
import { cp } from 'fs';


const CreateAdmission = ({ params }: { params: { id: number } }) => {
    const [medReport, setMedReport] = useState<MedicalReport>();
    const [patient, setPatient] = useState<Patient>();
    const [scheds, setScheds] = useState<Scheds[]>([]);
    const [doctorId, setDoctorId] = useState<number | null>(null);
    const [successMessage, setSuccessMessage] = useState<string>('');
    const [errorMessage, setErrorMessage] = useState<string>('');
    const [showSuccessMessage, setShowSuccessMessage] = useState<boolean>(false);
    const [showErrorMessage, setShowErrorMessage] = useState<boolean>(false);
    const [admissionId, setAdmissionId] = useState<number | null>(null);
    const [admissions, setAdmissions] = useState<Admission[]>([]);

    const Today = new Date();
    const formattedDate = format(Today, 'yyyy-MM-dd');

    useEffect(() => {
        const fetchPatient = async () => {
            if (!params.id) return;

            try {
                const response = await fetch(`http://localhost:8080/api/patient/search/${params.id}`);

                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }

                const patientData = await response.json();
                setPatient(patientData);
            } catch (error) {
                console.error('Error fetching patient:', error);
            }
        };

        fetchPatient();
    }, [params.id]);

    const submitAdmission = async () => {
        const token = getCookie("accessToken");
        if (!params.id || !token) return;

        try {
            const decodedToken = decodeJWTToken(token);

            const responseAdmissions = await fetch(`http://localhost:8080/api/admissions/searchByPatient/${params.id}`);

            if (!responseAdmissions.ok) {
                throw new Error(`HTTP error! Status: ${responseAdmissions.status}`);
            }

            const admissionsData = await responseAdmissions.json();

            let firstAdmissionId = 0;
            if (admissionsData.filter((admission: { date: string | number | Date; patientId: number; }) => admission.patientId === params.id && admission.date === formattedDate)) {
                firstAdmissionId = admissionsData[0].id;
            }

            const responseMedicalReport = await fetch('http://localhost:8080/api/medical-reports/create', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    doctorId: decodedToken.id,
                    patientId: params.id,
                    report: medReport?.report,
                    admissionId: firstAdmissionId,
                }),
            });

            if (!responseMedicalReport.ok) {
                throw new Error(`HTTP error! Status: ${responseMedicalReport.status}`);
            }

            console.log('Admission created successfully!');
            setSuccessMessage('Мед. заключение сохранено!');
            setShowSuccessMessage(true);


        } catch (error) {
            console.error('Error:', error);
            setErrorMessage('Произошла ошибка!');
            setShowErrorMessage(true);
        }
    };


    return (
        <div className={styles.container}>
            <div className={styles.card}>
                <div className={styles.info_doc}>
                    <h1 className={styles.card_H1}>Проведение приема</h1>
                    <p>Пациент: {patient?.lastName} {patient?.firstName}</p>
                    <textarea
                        value={medReport?.report}
                        onChange={(e) => setMedReport({ ...medReport, report: e.target.value, id: medReport?.id })}
                        placeholder="Мед. заключение (жалобы, диагноз, лечение) ..."
                        className={styles.textarea}
                    />
                </div>
                <div>
                    <Button type='submit' className={styles.button} onClick={submitAdmission} appearance='primary'>Записать данные</Button>
                </div>
                {showSuccessMessage && (
                    <div className={styles.successMessage}>{successMessage}</div>
                )}
                {showErrorMessage && (
                    <div className={styles.errorMessage}>{errorMessage}</div>
                )}
            </div>
        </div>
    );
};

export default CreateAdmission;