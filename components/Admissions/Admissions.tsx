'use client'

import { Doctor } from '@/interfaces/doctor.interface';
import { Specialty } from '@/interfaces/specialization.interface';
import { useEffect, useState } from 'react';
import styles from './Admissions.module.css'
import { Button } from '../Button/Button';
import Select from 'react-select';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { getSpecializations } from '@/app/api';


interface IdProps {
    id: number;
}

export const Admission: React.FC<IdProps> = ({ id }) => {
    const [doctor, setDoctor] = useState<Doctor>();
    const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());
    const [selectedTime, setSelectedTime] = useState<string | null>(null);

    const Today = new Date();
    const nextWeek = new Date();
    nextWeek.setDate(Today.getDate() + 7);

    useEffect(() => {
        const fetchDoctor = async () => {
            try {
                const response = await fetch(`http://localhost:8080/api/doctor/search/${id}`);

                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }

                const doctorData = await response.json();

                const specialtyResponse = await fetch(`http://localhost:8080/api/specialty/${doctorData.specialtyId}`);
                const specialtyData = await specialtyResponse.json();
                doctorData.specialty = specialtyData;

                setDoctor(doctorData);

            } catch (error) {
                console.error('Error fetching doctor:', error);
            }
        };

        if (id) {
            fetchDoctor();
        }
    }, [id]);




    const handleDateChange = (date: Date | null) => {
        setSelectedDate(date);
    };

    const handleTimeChange = (selectedOption: { label: string; value: string } | null) => {
        setSelectedTime(selectedOption?.value || null);
    };

    const generateTimeOptions = () => {
        const startTime = 8;
        const endTime = 19;
        const interval = 30;
        const timeOptions = [];

        for (let hour = startTime; hour < endTime; hour++) {
            for (let minute = 0; minute < 60; minute += interval) {
                const time = `${hour}:${minute === 0 ? '00' : minute}`;
                timeOptions.push({ label: time, value: time });
            }
        }

        return timeOptions;

    };

    if (!doctor) {
        return <div>Doctor not found</div>;

    }

    const timeOptions = generateTimeOptions();
    return (
        <div className={styles.container}>
            <div className={styles.card}>
                <div className={styles.info_doc}>
                    <h1 className={styles.card_H1}>Запись на прием</h1>
                    <p>Врач: {`${doctor.lastName} ${doctor.firstName}`}</p>
                    <p>Кабинет: №{doctor.office}</p>
                    <p>Должность: {doctor.position}</p>
                    <p>Специализация: {doctor.specialty.name}</p>
                </div>
                <div>
                    <label className={styles.label_card}>Дата:</label>
                    <DatePicker
                        className={styles.datePicker}
                        selected={selectedDate}
                        onChange={handleDateChange}
                        minDate={Today}
                        maxDate={nextWeek}
                    />
                </div>

                <div>
                    <label className={styles.label_card}>Время:</label>
                    <Select className={styles.sel} options={timeOptions} onChange={handleTimeChange} />
                </div>
                <Button className={styles.button} appearance='primary'>Записаться</Button>
            </div>
        </div>
    );
};

function setSelectedDate(date: Date | null) {
    throw new Error('Function not implemented.');
}

function setSelectedTime(arg0: string | null) {
    throw new Error('Function not implemented.');
}

