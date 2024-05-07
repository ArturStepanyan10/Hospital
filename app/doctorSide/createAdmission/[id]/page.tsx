'use client'


import { useEffect, useState } from 'react';
import styles from './createAdmission.module.css'
import { getCookie } from '../../../../utils/setCookie';
import { decodeJWTToken } from '../../../../utils/decodeJWT';
import { MedicalReport } from '../../../../interfaces/medicalReport.interface';
import { Button } from '../../../../components';
import { Patient } from '../../../../interfaces/patient.interface';
import { Admission } from '../../../../interfaces/admission.interface';
import { fi } from 'date-fns/locale';


const CreateAdmission = ({ params }: { params: { id: number } }) => {
    const [medReport, setMedReport] = useState<MedicalReport>();
    const [patient, setPatient] = useState<Patient>();
    const [admission, setAdmission] = useState<Admission[]>([]);
    const [doctorId, setDoctorId] = useState<number | null>(null);


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


    useEffect(() => {
        const fetchAdmissionsByPatient = async () => {
            if (!patient || !doctorId) return; // Проверяем наличие пациента и ID врача перед запросом

            try {
                const response = await fetch(`http://localhost:8080/api/admissions/searchByPatient/${patient?.id}`);

                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }

                const admissionsData = await response.json();

                // Фильтруем приемы по ID врача
                const filteredAdmissions = admissionsData.filter((admission: { doctorId: number; }) => admission.doctorId === doctorId);

                setAdmission(filteredAdmissions);


            } catch (error) {
                console.error('Error fetching admissions:', error);
            }
        };

        fetchAdmissionsByPatient();
    }, [patient, doctorId]);


    const submitAdmission = async () => {
        const token = getCookie("accessToken");
        if (!params.id || !token) return;

        try {
            const decodedToken = decodeJWTToken(token);

            const response = await fetch('http://localhost:8080/api/medical-reports/create', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    doctorId: decodedToken.id,
                    patientId: params.id,
                    report: medReport?.report,
                    admissionId: 2

                }),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            // Обработка успешного создания записи на прием
            console.log('Admission created successfully!');
            console.log(decodedToken.id);
            // Можно также обновить интерфейс или перенаправить пользователя на другую страницу
        } catch (error) {
            console.error('Error:', error);
            // Обработка ошибки при создании записи на прием
            // Можно вывести сообщение об ошибке или предложить повторить запрос
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

                </div>

                <div>
                    <Button type='submit' className={styles.button} onClick={submitAdmission} appearance='primary'>Записать данные</Button>
                </div>
            </div>
        </div>
    )
}


export default CreateAdmission;