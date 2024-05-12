'use client'

import styles from './schedule.module.css'
import { useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { Admission } from '../../../../interfaces/admission.interface';
import { Schedule } from '../../../../interfaces/schedules.interface';
import { format } from 'date-fns';
import { Scheds } from '../../../../interfaces/scheds.interface';

const Schedules = ({ params }: { params: { id: number } }) => {
    const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());
    const [admissions, setAdmissions] = useState<Admission[]>([]);
    const [schedules, setSchedules] = useState<Schedule>();
    const [scheds, setScheds] = useState<Scheds[]>([]);

    const Today = new Date();
    const formattedDate = format(Today, 'yyyy-MM-dd');


    const nextWeek = new Date();
    nextWeek.setDate(Today.getDate());

    const handleDateChange = (date: Date | null) => {
        setSelectedDate(date);
    };

    useEffect(() => {
        const fetchScheduleByDate = async () => {
            try {
                const fetchDataSchedule = await fetch(`http://localhost:8080/api/schedule/doctorForPatient/${params.id}?date=${formattedDate}`)

                if (!fetchDataSchedule.ok) {
                    throw new Error(`HTTP error! Status: ${fetchDataSchedule.status}`);
                }

                const scheduleData = await fetchDataSchedule.json();
                setSchedules(scheduleData);
            } catch (error) {
                console.error('Error fetching schedule:', error);
            }
        };
        fetchScheduleByDate();

    }, [params.id, formattedDate]);

    useEffect(() => {
        const fetchScheduleByDateDoctor = async () => {
            try {
                const fetchDataSchedule = await fetch(`http://localhost:8080/api/schedule/generate/doctor/${params.id}?date=${formattedDate}`)

                if (!fetchDataSchedule.ok) {
                    throw new Error(`HTTP error! Status: ${fetchDataSchedule.status}`);
                }

                const scheduleData = await fetchDataSchedule.json();
                setScheds(scheduleData);
            } catch (error) {
                console.error('Error fetching schedule:', error);
            }
        };
        fetchScheduleByDateDoctor();

    }, [params.id, formattedDate]);

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
            <div>
                <p>Рабочий день: {schedules?.startTime.toString()} - {schedules?.endTime.toString()}</p>
                <p className={styles.info}>{schedules?.additionalInfo}</p>
            </div>

            <p className={styles.text}>Приемы:</p>

            <table className={styles.scheduleTable}>
                <thead>
                    <tr>
                        <th>№</th>
                        <th>Время</th>
                        <th>Пациент</th>
                    </tr>
                </thead>
                <tbody>
                    {scheds.map((sched, index) => (
                        <tr key={sched.id}>
                            <td>{index + 1}</td>
                            <td>{String(sched.time)}</td>
                            <td>{sched.patientLastName} {sched.patientFirstName}</td>

                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default Schedules;
