'use client'

import { useEffect, useState } from 'react';
import { Patient } from '../../../interfaces/patient.interface';
import styles from './AdminPatients.module.css'
import Link from 'next/link';
import { getPatientsData } from '../../api';
import { Button } from '../../../components';
import { useRouter } from 'next/navigation';


const AdminPatients = () => {
    const [patients, setPatients] = useState<Patient[]>([]);
    const [successMessage, setSuccessMessage] = useState<string>('');
    const router = useRouter();

    useEffect(() => {
        const fetchPatients = async () => {
            try {
                const patientsData = await getPatientsData();
                setPatients(patientsData);

            } catch (error) {
                console.error('Error fetching patients:', error);
            }
        };

        fetchPatients();
    }, []);

    const handleDeletePatient = async (id: number) => {
        const confirmed = window.confirm('Вы уверены, что хотите удалить этого пациента?');
        if (!confirmed) {
            return;
        }

        try {
            const response = await fetch(`http://localhost:8080/api/patient/delete/${id}`, {
                method: 'DELETE',
            });
            if (!response.ok) {
                throw new Error('Failed to delete patient');
            }

            const updatedPatients = patients.filter(patient => patient.id !== id);
            setPatients(updatedPatients);
        } catch (error) {
            console.error('Error deleting patient:', error);
        }
    };


    return (
        <>

            <div className={styles.headerContainer}>
                <button className={styles.return} onClick={() => router.back()}>
                    Назад
                </button>
                <h1>Пациенты</h1>
            </div>


            {patients.map(patient => {
                return (
                    <div className={styles.cardContainer} key={patient.id}>
                        <h2>{patient.lastName} {patient.firstName}</h2>
                        <p>id: {patient.id}</p>
                        <p>Возраст: {patient.age}</p>
                        <p>Номер телефона: {patient.phoneNumber}</p>
                        <p>СНИЛС: {patient.snils}</p>

                        <Link href={`/adminSide/AdminPatients/EditPatient/${patient.id}`}>
                            <Button className={styles.button} appearance='primary'>
                                Изменить
                            </Button>
                        </Link>

                        <Button
                            className={styles.buttonForDel}
                            appearance='delete'
                            onClick={() => handleDeletePatient(patient.id)}
                        >
                            Удалить
                        </Button>
                    </div>


                )
            })}


        </>
    );
}


export default AdminPatients;