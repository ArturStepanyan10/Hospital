'use client'

import React, { use, useEffect, useState } from 'react';
import { Doctor } from '../../../interfaces/doctor.interface';
import { getDoctorsData, getSpecializations } from '../../api';
import styles from './AdminDoctors.module.css';
import { Specialty } from '../../../interfaces/specialization.interface';
import Link from 'next/link';
import { Button } from '../../../components';

const AdminDoctors = () => {
    const [doctors, setDoctors] = useState<Doctor[]>([]);
    const [specialty, setSpecialty] = useState<Specialty[]>([]);

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
        try {
            const response = await fetch(`http://localhost:8080/api/doctor/delete/${id}`, {
                method: 'DELETE',
            });
            if (!response.ok) {
                throw new Error('Failed to delete doctor');
            }
            console.log('successfully')
            // Добавьте код для редиректа пользователя на другую страницу или отображения сообщения об успешном удалении
        } catch (error) {
            console.error('Error deleting doctor:', error);
        }
    };

    return (
        <>
            <div className={styles.headerContainer}>
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

