'use client'

import { useEffect, useState } from 'react';
import styles from './ScheduleEdit.module.css'
import { useRouter } from 'next/navigation';


const ScheduleEdit = ({ params }: { params: { id: number } }) => {

    const [scheduleData, setScheduleData] = useState<any>({});
    const [successMessage, setSuccessMessage] = useState<string>('');
    const [errorMessage, setErrorMessage] = useState<string>('');
    const [showSuccessMessage, setShowSuccessMessage] = useState<boolean>(false);
    const [showErrorMessage, setShowErrorMessage] = useState<boolean>(false);
    const router = useRouter();

    useEffect(() => {
        const fetchScheduleData = async () => {
            try {
                const response = await fetch(`http://localhost:8080/api/schedule/${params.id}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch schedule data');
                }
                const scheduleData = await response.json();
                setScheduleData(scheduleData);
            } catch (error) {
                console.error('Error fetching schedule data:', error);
            }
        };

        fetchScheduleData();
    }, [params.id]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setScheduleData((prevState: any) => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await fetch(`http://localhost:8080/api/schedule/update`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    id: params.id,
                    doctorId: scheduleData.doctorId,
                    startTime: scheduleData.startTime,
                    endTime: scheduleData.endTime,
                    scheduleDate: scheduleData.scheduleDate,
                    additionalInfo: scheduleData.additionalInfo
                })
            });
            if (!response.ok) {
                throw new Error('Failed to update schedule data');
            }
            console.log('Successfully');
            setShowSuccessMessage(true);
            setSuccessMessage('Расписание обновлено');
        } catch (error) {
            console.error('Error updating schedule data:', error);
            setShowErrorMessage(true);
            setErrorMessage('Произошла ошибка при обновлении расписания');
        }
    };

    return (
        <div>
            <button className={styles.return} onClick={() => router.back()}>
                Назад
            </button>

            <form className={styles.formContainer} onSubmit={handleSubmit}>
                <h1>Редактирование расписания #{params.id}</h1>
                <label>
                    Доктор id:
                    <input type="text" name="doctorId" value={scheduleData.doctorId || ''} onChange={handleInputChange} />
                </label><br />
                <label>
                    Начало рабочего дня:
                    <input type="text" name="startTime" value={scheduleData.startTime || ''} onChange={handleInputChange} />
                </label><br />
                <label>
                    Конец рабочего дня:
                    <input type="text" name="endTime" value={scheduleData.endTime || ''} onChange={handleInputChange} />
                </label><br />
                <label>
                    Дата:
                    <input type="text" name="scheduleDate" value={scheduleData.scheduleDate || ''} onChange={handleInputChange} />
                </label><br />
                <label>
                    Справочная информация:
                    <input type="text" name="additionalInfo" value={scheduleData.additionalInfo || ''} onChange={handleInputChange} />
                </label><br />
                <button type="submit">Сохранить изменения</button>
                {showSuccessMessage && (
                    <div className={styles.successMessage}>{successMessage}</div>
                )}
                {showErrorMessage && (
                    <div className={styles.errorMessage}>{errorMessage}</div>
                )}
            </form>
        </div>
    );
};


export default ScheduleEdit;