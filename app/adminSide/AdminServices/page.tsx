'use client'


import { use, useEffect, useState } from 'react';
import { Service } from '../../../interfaces/service.interface';
import { getServices } from '../../api';
import styles from './AdminService.module.css'
import Link from 'next/link';
import { Button } from '../../../components';
import { useRouter } from 'next/navigation';


const AdminServices = () => {
    const [services, setServices] = useState<Service[]>([]);
    const router = useRouter();

    useEffect(() => {
        const fetchServices = async () => {
            try {
                const servicesData = await getServices();
                setServices(servicesData);
                console.log(servicesData);
            } catch (error) {
                console.error('Error fetching services', error);
            }
        };
        fetchServices();
    }, []);

    const handleDeleteService = async (id: number) => {
        const confirmed = window.confirm('Вы уверены, что хотите удалить эту услугу?');
        if (!confirmed) {
            return;
        }

        try {
            const response = await fetch(`http://localhost:8080/api/medical-service/delete/${id}`, {
                method: 'DELETE',
            });
            if (!response.ok) {
                throw new Error('Failed to delete service');
            }

            const updatedServices = services.filter(service => service.id !== id);
            setServices(updatedServices);
        } catch (error) {
            console.error('Error deleting service:', error);
        }
    };

    return (
        <>
            <div className={styles.headerContainer}>
                <button className={styles.return} onClick={() => router.back()}>
                    Назад
                </button>
                <h1>Услуги</h1>
                <Link href='/adminSide/AdminServices/CreateServices'>
                    <Button className={styles.create} appearance='create'>
                        Создать услугу
                    </Button>
                </Link>
            </div>
            {services.map((service) => {
                return (
                    <div className={styles.card} key={service.id}>
                        <h2>Название услуги: {service.name}</h2>
                        <p>id: {service.id}</p>
                        <p>Описание: {service.description}</p>
                        <p>Стоимость: {service.price} ₽</p>

                        <Link href={`/adminSide/AdminServices/EditService/${service.id}`}>
                            <Button className={styles.button} appearance='primary'>
                                Изменить
                            </Button>
                        </Link>

                        <Button
                            className={styles.buttonForDel}
                            appearance='delete'
                            onClick={() => handleDeleteService(service.id)}
                        >
                            Удалить
                        </Button>
                    </div>
                );
            })}
        </>
    )
}

export default AdminServices;