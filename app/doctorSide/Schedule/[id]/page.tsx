'use client'

import styles from './schedule.module.css'
import { useEffect, useState } from 'react';
import Select from 'react-select';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useRouter } from 'next/navigation';
import { Admission } from '../../../../interfaces/admission.interface';

const Schedule = ({ params }: { params: { id: number } }) => {
    const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());
    const [admissions, setAdmissions] = useState<Admission[]>([]);

    const Today = new Date();
    const nextWeek = new Date();
    nextWeek.setDate(Today.getDate() + 3);

    const handleDateChange = (date: Date | null) => {
        setSelectedDate(date);
    };

    useEffect(() => {
        const fetchAdmissionsByDoctorAndDate = async () => {
            if (!params.id || !selectedDate) return;

            try {
                const response = await fetch(`http://localhost:8080/api/admissions/all`);

                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }

                const admissionsData = await response.json();

                // Фильтруем приемы по ID врача и выбранной дате
                const filteredAdmissions = admissionsData.filter((admission: Admission) => {
                    const admissionDate = new Date(admission.date);
                    admissionDate.setHours(0, 0, 0, 0); // Устанавливаем время на полночь, чтобы сравнивать только даты
                    const selectedDateWithoutTime = new Date(selectedDate);
                    selectedDateWithoutTime.setHours(0, 0, 0, 0); // То же самое для выбранной даты
                    return admission.doctorId === Number(params.id) && admissionDate.getTime() === selectedDateWithoutTime.getTime();
                });

                setAdmissions(filteredAdmissions);

            } catch (error) {
                console.error('Error fetching admissions:', error);
            }
        };

        fetchAdmissionsByDoctorAndDate();
    }, [params.id, selectedDate]);

    return (
        <div className={styles.cardPatient}>
            <h1 className={styles.card_H1}>Расписание</h1>

            <label className={styles.label_card}>Дата: </label>
            <DatePicker
                className={styles.datePicker}
                selected={selectedDate}
                onChange={handleDateChange}
                minDate={Today}
                maxDate={nextWeek}
            />

            <p className={styles.text}>Приемы:</p>

            <table className={styles.scheduleTable}>
                <thead>
                    <tr>
                        <th>№</th>
                        <th>Время</th>
                    </tr>
                </thead>
                <tbody>
                    {admissions.map((admission, index) => (
                        <tr key={admission.id}>
                            <td>{index + 1}</td>
                            <td>{String(admission.time)}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default Schedule;
