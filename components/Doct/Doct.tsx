'use client'


import React, { useEffect } from 'react';
import { Doctor } from '@/interfaces/doctor.interface';
import { Button } from '../Button/Button';
//import styles from './Doctor.module.css';
import { useRouter } from 'next/router';
import Link from 'next/link';

export const Doct: React.FC<Doctor> = ({ id, surname, name, experience, post, specName }) => {

    return (
        <div >
            <h2 >{`${surname} ${name}`}</h2>
            <p >Стаж работы: {experience} years</p>
            <p >Пост: {post}</p>
            <p >Специализация: {specName}</p>
            <Link href={`/admission/${id}`}>
                <Button appearance='primary'>Записаться</Button>
            </Link>
        </div>


    )
};



