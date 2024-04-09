'use client'


import React from 'react';
import { Service } from '@/interfaces/service.interface';
import { Tag } from '../Tag/Tag';
import styles from './servic.module.css';
import { Button } from '../Button/Button';


export const Servic: React.FC<Service> = ({ name, price, description }) => (


    <div className={styles.card}>

        <h2 className={styles.servicName}>{name}</h2>
        <p className={styles.description}>{description}</p>
        <Button className={styles.servicButton} appearance='primary'>Оплатить</Button>
        <Tag className={styles.servicCost} size='m' color='green'>{price} ₽</Tag>

    </div>

);