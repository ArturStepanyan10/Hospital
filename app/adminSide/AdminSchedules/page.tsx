'use client'

import { ChangeEvent, useEffect, useState } from 'react';
import styles from './AdminSchedules.module.css'
import { Button, Input } from '../../../components';
import Select from 'react-select';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Link from 'next/link';
import { Schedule } from '../../../interfaces/schedules.interface';
import { format } from 'date-fns';
import { useRouter } from 'next/navigation';


const AdminSchedules = () => {
    const [doctorId, setDoctorId] = useState<number>();
    const [startTime, setStartTime] = useState<string | null>(null);
    const [endTime, setEndTime] = useState<string | null>(null);
    const [scheduleDate, setScheduleDate] = useState<Date | null>(new Date());
    const [additionalInfo, setAdditionalInfo] = useState<string>("");
    const [successMessage, setSuccessMessage] = useState<string>('');
    const [showSuccessMessage, setShowSuccessMessage] = useState<boolean>(false);
    const [showErrorMessage, setShowErrorMessage] = useState<boolean>(false);
    const router = useRouter();

    const Today = new Date();
    const formattedDate = format(Today, 'yyyy-MM-dd');

    const nextWeek = new Date();
    nextWeek.setDate(Today.getDate() + 3);

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
            setSuccessMessage('Данные успешно обновлены!')
            setShowSuccessMessage(true);
        } catch (error) {
            console.error('Error:', error);
            setSuccessMessage('Произошла ошибка при обновлении данных');
            setShowErrorMessage(true);
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
        <><button className={styles.return} onClick={() => router.back()}>
            Назад
        </button><div className={styles.formContainer}>

                <h1>Создание расписания</h1>
                <form>
                    <Input
                        onChange={handledDoctorIdChange}
                        type="text"
                        placeholder="Доктор (id)"
                        value={doctorId !== undefined ? doctorId.toString() : ''} /> <br />

                    <Select className={styles.sel} placeholder="Начало рабочего дня" options={timeOptions} onChange={handleStartTimeChange} />
                    <br />
                    <Select className={styles.sel} placeholder="Конец рабочего дня" options={timeOptions} onChange={handleEndTimeChange} />
                    <br />
                    <DatePicker
                        className={styles.datePicker}
                        selected={scheduleDate}
                        onChange={handleScheduleDateChange}
                        minDate={Today}
                        maxDate={nextWeek} /> <br />
                    <Input
                        onChange={handleAdditionalInfoChange}
                        type="text"
                        placeholder="Справочная информация"
                        value={additionalInfo} />

                    <Button type='submit' className={styles.button} onClick={submitAdmission} appearance='primary'>
                        Создать расписание
                    </Button>
                    <Link href='/adminSide/AdminSchedules/EditSchedules'>
                        <p className={styles.up}>
                            Изменить расписания
                        </p></Link>
                    {showSuccessMessage && (
                        <div className={styles.successMessage}>{successMessage}</div>
                    )}
                    {showErrorMessage && (
                        <div className={styles.errorMessage}>{successMessage}</div>
                    )}
                </form>
            </div></>

    )
}

export default AdminSchedules;