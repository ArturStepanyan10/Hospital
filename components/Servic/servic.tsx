import React from 'react';
import { Tag } from '../Tag/Tag';
import styles from './servic.module.css';
import { Button } from '../Button/Button';
import Link from 'next/link';
import { Service } from '../../interfaces/service.interface';
import { getCookie } from '../../utils/setCookie';


export const Servic: React.FC<Service> = ({ id, name, price, description }) => {
    const isUserLoggedIn = !!getCookie("accessToken");

    return (
        <div className={styles.card}>
            <h2 className={styles.servicName}>{name}</h2>
            <p className={styles.description}>{description}</p>
            {isUserLoggedIn ? (

                <Button className={styles.button} appearance='primary'>
                    Оплатить
                </Button>

            ) : (
                <Link href="../sign-in/">
                    <Button className={styles.button} appearance='primary'>
                        Оплатить
                    </Button>
                </Link>
            )}
            <Tag className={styles.servicCost} size='m' color='green'>{price} ₽</Tag>
        </div>
    );
};
