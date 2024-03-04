'use client'


import React from 'react';
import { Service } from '@/interfaces/service.interface';
import { Tag } from '../Tag/Tag';
import styles from './servic.module.css';
import { Button } from '../Button/Button';


export const Servic: React.FC<Service> = ({ serviceName, descriptionService, costService }) => (


    <div className={styles.card}>

        <h2 className={styles.servicName}>{serviceName}</h2>
        <p className={styles.description}>{descriptionService}</p>
        <Button className={styles.servicButton} appearance='primary'>Оплатить</Button>
        <Tag className={styles.servicCost} appearance='m' color='green'>{costService} ₽</Tag>

    </div>

);