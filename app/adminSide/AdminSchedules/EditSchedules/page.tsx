'use client'

import { useState } from 'react';
import { Schedule } from '../../../../interfaces/schedules.interface';
import styles from './EditSchedules.module.css'
import Link from 'next/link';
import { Button } from '../../../../components';
import { useRouter } from 'next/navigation';

const EditSchedules = () => {
    const [schedules, setSchedules] = useState<Schedule | null>(null);
    const [doctorId, setDoctorId] = useState('');
    const [formattedDate, setFormattedDate] = useState('');
    const [showMessage, setShowMessage] = useState<boolean>(false);
    const [mess, setMess] = useState('');
    const router = useRouter();

    const fetchScheduleByDate = async () => {
        try {
            const fetchDataSchedule = await fetch(`http://localhost:8080/api/schedule/doctorForPatient/${doctorId}?date=${formattedDate}`)

            if (!fetchDataSchedule.ok) {
                throw new Error(`HTTP error! Status: ${fetchDataSchedule.status}`);
            }

            const scheduleData = await fetchDataSchedule.json();
            setSchedules(scheduleData);
            setShowMessage(true);
            setMess('Успешно')

        } catch (error) {
            console.error('Error fetching schedule:', error);
            setShowMessage(true);
            setMess('Ошибка, неправильное id или дата. Возможно, нет данных!')
        }
    };

    const handleDeleteSchedule = async (id: number) => {
        const confirmed = window.confirm('Вы уверены, что хотите удалить этого врача?');
        if (!confirmed) {
            return;
        }

        try {
            const response = await fetch(`http://localhost:8080/api/schedule/${id}`, {
                method: 'DELETE',
            });
            if (!response.ok) {
                throw new Error('Failed to delete schedule');
            }
            console.log('Successfully deleted schedule');
            router.refresh();
        } catch (error) {
            console.error('Error deleting schedule:', error);
        }
    };


    return (
        <div>
            <button className={styles.return} onClick={() => router.back()}>
                Назад
            </button>
            <h1>Поиск и редактирование расписания</h1> <br />
            <div className={styles.Input}>
                <label>
                    <input
                        type="text"
                        value={doctorId}
                        onChange={(e) => setDoctorId(e.target.value)}
                        placeholder='Доктор id: 2'
                    />
                </label>
                <label>
                    <input
                        type="text"
                        value={formattedDate}
                        onChange={(e) => setFormattedDate(e.target.value)}
                        placeholder='Дата: YYYY-MM-DD'
                    />
                </label>
                <button className={styles.button} onClick={fetchScheduleByDate}>Поиск расписания</button>
            </div>
            <br />
            {showMessage && (
                <div className={styles.mess}>{mess}</div>
            )}
            <br />
            {schedules && (
                <div className={styles.scheduleCard}>
                    <h2>Детали расписания</h2>
                    <p>id: {schedules.id}</p>
                    <p>Доктор: {schedules.doctorId}</p>
                    <p>Начало рабочего дня: {String(schedules.startTime)}</p>
                    <p>Конец рабочего дня: {String(schedules.endTime)}</p>
                    <p>День: {String(schedules.scheduleDate)}</p>
                    <p>Справочная информация: {schedules.additionalInfo}</p>
                    <Link href={`/adminSide/AdminSchedules/EditSchedules/ScheduleEdit/${schedules.id}`}>
                        <Button className={styles.button} appearance='primary'>
                            Изменить
                        </Button>
                    </Link>

                    <Button
                        className={styles.buttonForDel}
                        appearance='delete'
                        onClick={() => handleDeleteSchedule(schedules.id)}
                    >
                        Удалить
                    </Button>
                </div>
            )}
        </div>
    );
}

export default EditSchedules;
