'use client'


import { useEffect, useState } from 'react';
import { Specialty } from '../../../interfaces/specialization.interface';
import { getSpecializations } from '../../api';
import styles from './AdminSpeciality.module.css'
import Link from 'next/link';
import { Button } from '../../../components';


const AdminSpeciality = () => {
    const [specialitys, setSpecialitys] = useState<Specialty[]>([]);
    const [successMessage, setSuccessMessage] = useState<string>('');

    useEffect(() => {
        const fetchSpecialty = async () => {
            try {
                const specialityData = await getSpecializations();
                setSpecialitys(specialityData);
            } catch (error) {
                console.error('Error fetching specialty:', error);
            }
        };

        fetchSpecialty();
    }, []);

    const handleDeleteSpeciality = async (id: number) => {
        try {
            const response = await fetch(`http://localhost:8080/api/specialty/delete/${id}`, {
                method: 'DELETE',
            });
            if (!response.ok) {
                throw new Error('Failed to delete speciality');
            }
            setSuccessMessage('Специальность успешно удален');
            setTimeout(() => {
                setSuccessMessage('');
            }, 3000); // Скрыть сообщение через 3 секунды
            const updatedSpecialty = specialitys.filter(speciality => speciality.id !== id);
            setSpecialitys(updatedSpecialty);
        } catch (error) {
            console.error('Error deleting speciality:', error);
        }
    };

    return (
        <>
            <div className={styles.headerContainer}>
                <h1>Специальности</h1>
                <Link href='/adminSide/AdminSpeciality/CreateSpeciality'>
                    <Button className={styles.create} appearance='create'>
                        Добавить специалньость
                    </Button>
                </Link>
            </div>

            {specialitys.map((speciality) => {
                return (
                    <div className={styles.cardContainer} key={speciality.id}>
                        <h2>{speciality.name}</h2>

                        <Button
                            className={styles.buttonForDel}
                            appearance='delete'
                            onClick={() => handleDeleteSpeciality(speciality.id)}
                        >
                            Удалить
                        </Button>
                    </div>
                )
            })}
        </>
    )
}

export default AdminSpeciality;