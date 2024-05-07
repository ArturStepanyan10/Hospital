'use client'


import { useEffect, useState } from 'react';
import styles from './Admissions.module.css'
import { Button } from '../Button/Button';
import Select from 'react-select';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { Doctor } from '../../interfaces/doctor.interface';
import { Patient } from '../../interfaces/patient.interface';
import { getCookie } from '../../utils/setCookie';
import { decodeJWTToken } from '../../utils/decodeJWT';
import { useRouter } from 'next/navigation';


interface IdProps {
    id: number;
}

export const Admission: React.FC<IdProps> = ({ id }) => {
    const [patient, setPatient] = useState<Patient>();
    const [doctor, setDoctor] = useState<Doctor>();
    const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());
    const [selectedTime, setSelectedTime] = useState<string | null>(null);
    const [successMessage, setSuccessMessage] = useState<string>('');

    const router = useRouter();

    const Today = new Date();
    const nextWeek = new Date();
    nextWeek.setDate(Today.getDate() + 7);

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
                const formattedHour = hour.toString().padStart(2, '0'); // Преобразование часов в двузначное число
                const formattedMinute = minute === 0 ? '00' : minute.toString(); // Преобразование минут в двузначное число
                const time = `${formattedHour}:${formattedMinute}`;
                timeOptions.push({ label: time, value: time });

            }
        }

        return timeOptions;
    };

    if (!doctor) {
        return <div>Doctor not found</div>;

    }

    const submitAdmission = async () => {
        try {
            if (!doctor) {
                console.error('Doctor data is not yet available.');
                return;
            }

            if (!selectedDate || !selectedTime) {
                console.error('Please select date and time.');
                return;
            }

            const response = await fetch('http://localhost:8080/api/admissions/create', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    doctorId: id,
                    patientId: patient?.id,
                    date: selectedDate,
                    time: selectedTime,
                    serviceId: 1
                }),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }


            console.log('Admission created successfully!');
            setTimeout(() => {
                router.back(); // Вернуться назад через некоторое время
            }, 3000);
            // Обработка успешного создания записи на прием

            // Можно также обновить интерфейс или перенаправить пользователя на другую страницу
        } catch (error) {
            console.error('Error:', error);
            // Обработка ошибки при создании записи на прием
            // Можно вывести сообщение об ошибке или предложить повторить запрос
        }
    };

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
                {successMessage && (
                    <div className={styles.successMessage}>{successMessage}</div>
                )}
                <Button type='submit' className={styles.button} onClick={submitAdmission} appearance='primary'>Записаться</Button>
            </div>
        </div>
    );
};










