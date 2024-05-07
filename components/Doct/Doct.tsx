import React from 'react';
import { Button } from '../Button/Button';
import styles from './Doct.module.css';
import Link from 'next/link';
import { Doctor } from '../../interfaces/doctor.interface';
import { getCookie } from '../../utils/setCookie';

export const Doct: React.FC<Doctor> = ({ id, firstName, lastName, work_experience, position, office }) => {
    const isUserLoggedIn = !!getCookie("accessToken");

    return (
        <div className={styles.doctorContainer}>
            <div className={styles.doctorInfo}>
                <div>
                    <h2 className={styles.doctorName}>{`${lastName} ${firstName}`}</h2>
                    <p className={styles.doctorText}>Стаж работы: {`${work_experience}`} years</p>
                    <p className={styles.doctorText}>Должность: {position}</p>
                    <p className={styles.doctorText}>Кабинет: №{office}</p>
                </div>

                {isUserLoggedIn ? (
                    <Link href={`/Admission/${id}`}>
                        <Button className={styles.button} appearance='primary'>
                            Записаться
                        </Button>
                    </Link>) : (
                    <Link href="../sign-in/">
                        <Button className={styles.button} appearance='primary'>
                            Записаться
                        </Button>
                    </Link>
                )}</div>
        </div>
    )
};
