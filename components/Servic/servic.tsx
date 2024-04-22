'use client'


import React from 'react';
import { Service } from '@/interfaces/service.interface';
import { Tag } from '../Tag/Tag';
import styles from './servic.module.css';
import { Button } from '../Button/Button';
import Link from 'next/link';


export const Servic: React.FC<Service> = ({ id, name, price, description }) => (


    <div className={styles.card}>

        <h2 className={styles.servicName}>{name}</h2>
        <p className={styles.description}>{description}</p>
        <Link href={`/AdmissionService/${id}`} className={styles.servicButton}><Button className={styles.button} appearance='primary'>Записаться</Button></Link>
        <Tag className={styles.servicCost} size='m' color='green'>{price} ₽</Tag>

    </div>

);