'use client'

import { Patient } from '@/interfaces/patient.interface';
import styles from './AdmissionsService.module.css'
import { useEffect, useState } from 'react';
import { decodeJWTToken } from '@/utils/decodeJWT';
import { getCookie } from '@/utils/setCookie';
import { Service } from '@/interfaces/service.interface';
import { Button } from '../Button/Button';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Select from 'react-select';




interface IdProps {
    id: number;
};

export const AdmissionService: React.FC<IdProps> = ({ id }) => {
    const [patient, setPatient] = useState<Patient>();
    const [service, setService] = useState<Service>();
    const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());
    const [selectedTime, setSelectedTime] = useState<string | null>(null);

    const Today = new Date();
    const nextWeek = new Date();
    nextWeek.setDate(Today.getDate() + 14);

    useEffect(() => {
        const fetchPatient = async () => {
            const token = getCookie("accessToken");
            if (!id || !token) return;

            try {
                const decodedToken = decodeJWTToken(token);
                const response = await fetch(`http://localhost:8080/api/patient/search/${decodedToken.id}`);

                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }

                const patientData = await response.json();
                setPatient(patientData);
            } catch (error) {
                console.error('Error fetching patient:', error);
            }
        };

        fetchPatient();
    }, [id]);

    useEffect(() => {
        const fetchService = async () => {
            try {
                const responseService = await fetch(`http://localhost:8080/api/medical-service/search/${id}`);

                if (!responseService.ok) {
                    throw new Error(`HTTP error! Status: ${responseService.status}`);
                }

                const serviceData = await responseService.json();
                setService(serviceData);
            } catch (error) {
                console.error('Error fetching service:', error);
            };
        };
        fetchService();
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

    const submitAdmission = async () => {
        try {
            if (!patient) {
                console.error('Doctor data is not yet available.');
                return;
            }

            const response = await fetch('http://localhost:8080/api/admissions/create', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    patientId: patient.id,
                    date: selectedDate,
                    time: selectedTime,
                    serviceId: id
                }),
            });
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const timeOptions = generateTimeOptions();
    return (
        <div className={styles.container}>
            <div className={styles.card}>
                <div className={styles.info_doc}>
                    <h1 className={styles.card_H1}>Запись на услугу</h1>
                    <p>Название услуги: {`${service?.name}`}</p>
                    <p>Пациент: {`${patient?.lastName} ${patient?.firstName}`}</p>
                    <p>Стоимость услуги: {`${service?.price} ₽`}</p>
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
                <Button type='submit' onClick={submitAdmission} className={styles.button} appearance='primary'>
                    Оплатить
                </Button>

            </div>
        </div>
    );
};


