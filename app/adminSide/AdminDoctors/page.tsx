'use client'

import React, { use, useEffect, useState } from 'react';
import { Doctor } from '../../../interfaces/doctor.interface';
import { getDoctorsData, getSpecializations } from '../../api';
import styles from './AdminDoctors.module.css';
import { Specialty } from '../../../interfaces/specialization.interface';
import Link from 'next/link';
import { Button } from '../../../components';
import { useRouter } from 'next/navigation';

const AdminDoctors = () => {
    const [doctors, setDoctors] = useState<Doctor[]>([]);
    const [specialty, setSpecialty] = useState<Specialty[]>([]);
    const router = useRouter();

    useEffect(() => {
        const fetchDoctors = async () => {
            try {
                const doctorsData = await getDoctorsData();
                setDoctors(doctorsData);
            } catch (error) {
                console.error('Error fetching doctors data:', error);
            }
        };

        fetchDoctors();
    }, []);

    useEffect(() => {
        const fetchSpecialty = async () => {
            try {
                const specialtyData = await getSpecializations();
                setSpecialty(specialtyData);
                console.log(specialtyData);
            } catch (error) {
                console.error('Error fetching specialty data:', error);
            }

        };
        fetchSpecialty();
    }, []);

    const handleDeleteDoctor = async (id: number) => {
        const confirmed = window.confirm('Вы уверены, что хотите удалить этого врача?');
        if (!confirmed) {
            return;
        }

        try {
            const response = await fetch(`http://localhost:8080/api/doctor/delete/${id}`, {
                method: 'DELETE',
            });
            if (!response.ok) {
                throw new Error('Failed to delete doctor');
            }
            console.log('Successfully deleted doctor');
            setDoctors(doctors.filter(doctor => doctor.id !== id));
        } catch (error) {
            console.error('Error deleting doctor:', error);
        }
    };

    return (
        <>
            <div className={styles.headerContainer}>
                <button className={styles.return} onClick={() => router.back()}>Назад</button>
                <h1>Врачи</h1>
                <Link href='/adminSide/AdminDoctors/CreateDoctor'>
                    <Button className={styles.create} appearance='create'>Добавить врача</Button>
                </Link>
            </div>

            {doctors.map((doctor) => {
                const doctorSpecialty = specialty.find(spec => spec.id === doctor.specialtyId);

                return (
                    <div className={styles.cardContainer} key={doctor.id}>
                        <h2>
                            {doctor.lastName} {doctor.firstName}
                        </h2>
                        <p>id: {doctor.id}</p>
                        <p>Кабинет: {doctor.office}</p>
                        <p>Стаж: {doctor.work_experience}</p>
                        <p>Должность: {doctor.position}</p>
                        <p>Специальность: {doctorSpecialty ? doctorSpecialty.name : 'Неизвестно'}</p>
                        <Link href={`/adminSide/AdminDoctors/EditDoctor/${doctor.id}`}>
                            <Button className={styles.button} appearance='primary'>
                                Изменить
                            </Button>
                        </Link>

                        <Button
                            className={styles.buttonForDel}
                            appearance='delete'
                            onClick={() => handleDeleteDoctor(doctor.id)}
                        >
                            Удалить
                        </Button>
                    </div>
                );
            })}
        </>
    );
};

export default AdminDoctors;

