'use client'


import React, { useEffect } from 'react';
import { Doctor } from '@/interfaces/doctor.interface';
import { Button } from '../Button/Button';
import styles from './Doct.module.css';
import Link from 'next/link';

export const Doct: React.FC<Doctor> = ({ id, firstName, lastName, specialty, position, office }) => {

    return (

        <div className={styles.doctorContainer}>

            <h2 className={styles.doctorName}>{`${lastName} ${firstName}`}</h2>
            <p className={styles.doctorText}>Стаж работы: {2} years</p>
            <p className={styles.doctorText}>Должность: {position}</p>
            <p className={styles.doctorText}>Кабинет: {office}</p>
            <Link href={`/Admission/${id}`}>
                <Button className={styles.button} appearance='primary'>Записаться</Button>
            </Link>
        </div>
    )
};



