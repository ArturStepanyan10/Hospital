'use client'

import { ChangeEvent, useEffect, useState } from 'react';
import styles from './AdminSchedules.module.css'
import { Button, Input } from '../../../components';
import Select from 'react-select';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Link from 'next/link';


const AdminSchedules = () => {
    const [id, setId] = useState<number>();
    const [doctorId, setDoctorId] = useState<number>();
    const [startTime, setStartTime] = useState<string | null>(null);
    const [endTime, setEndTime] = useState<string | null>(null);
    const [scheduleDate, setScheduleDate] = useState<Date | null>(new Date());
    const [additionalInfo, setAdditionalInfo] = useState<string>("");

    const Today = new Date();
    const nextWeek = new Date();
    nextWeek.setDate(Today.getDate() + 3);

    function handledIdSetSchedChange(e: ChangeEvent<HTMLInputElement>) {
        setId(parseInt(e.target.value));
    }

    function handledDoctorIdChange(e: ChangeEvent<HTMLInputElement>) {
        setDoctorId(parseInt(e.target.value));
    }

    const handleStartTimeChange = (selectedOption: { label: string; value: string } | null) => {
        setStartTime(selectedOption?.value || null);
    };

    const handleEndTimeChange = (selectedOption: { label: string; value: string } | null) => {
        setEndTime(selectedOption?.value || null);
    }

    const handleScheduleDateChange = (date: Date | null) => {
        setScheduleDate(date);
    }

    const handleAdditionalInfoChange = (e: ChangeEvent<HTMLInputElement>) => {
        setAdditionalInfo(e.target.value);
    }



    const submitAdmission = async () => {
        try {

            const response = await fetch('http://localhost:8080/api/schedule/create', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    id: id,
                    doctorId: doctorId,
                    startTime: startTime,
                    endTime: endTime,
                    scheduleDate: scheduleDate,
                    additionalInfo: additionalInfo
                }),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            console.log('Success!');

            // Можно также обновить интерфейс или перенаправить пользователя на другую страницу
        } catch (error) {
            console.error('Error:', error);
            // Обработка ошибки при создании записи на прием
            // Можно вывести сообщение об ошибке или предложить повторить запрос
        }
    };

    const generateTimeOptions = () => {
        const startTime = 8;
        const endTime = 19;
        const interval = 30;
        const timeOptions = [];

        for (let hour = startTime; hour < endTime; hour++) {
            for (let minute = 0; minute < 60; minute += interval) {
                const formattedHour = hour.toString().padStart(2, '0'); // Преобразование часов в двузначное число
                const formattedMinute = minute === 0 ? '00' : minute.toString(); // Преобразование минут в двузначное число
                const time = `${formattedHour}:${formattedMinute}`;
                timeOptions.push({ label: time, value: time });

            }
        }

        return timeOptions;
    };

    const timeOptions = generateTimeOptions();
    return (

        <div className={styles.formContainer}>
            <h1>Создание расписания</h1>
            <form >
                <Input
                    onChange={handledIdSetSchedChange}
                    type="text"
                    placeholder="Расписание (id)"
                    value={id !== undefined ? id.toString() : ''}
                /> <br />
                <Input
                    onChange={handledDoctorIdChange}
                    type="text"
                    placeholder="Доктор (id)"
                    value={doctorId !== undefined ? doctorId.toString() : ''}
                /> <br />

                <Select className={styles.sel} placeholder="Начало рабочего дня" options={timeOptions} onChange={handleStartTimeChange} />
                <br />
                <Select className={styles.sel} placeholder="Конец рабочего дня" options={timeOptions} onChange={handleEndTimeChange} />
                <br />
                <DatePicker
                    className={styles.datePicker}
                    selected={scheduleDate}
                    onChange={handleScheduleDateChange}
                    minDate={Today}
                    maxDate={nextWeek}

                /> <br />
                <Input
                    onChange={handleAdditionalInfoChange}
                    type="text"
                    placeholder="Справочная информация"
                    value={additionalInfo}
                />

                <Button type='submit' className={styles.button} onClick={submitAdmission} appearance='primary'>
                    Создать расписание
                </Button>
                <Link href=''>
                    <p className={styles.up}>
                        Изменить расписания
                    </p></Link>
                <Link href=''><p className={styles.del}>
                    Удалить расписание
                </p></Link>
            </form>
        </div>

    )
}

export default AdminSchedules;