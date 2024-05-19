'use client'


import React, { useState, useEffect } from 'react';
import styles from './EditDoctor.module.css'
import { useRouter } from 'next/navigation';

const EditDoctor = ({ params }: { params: { id: number } }) => {
    const [doctorData, setDoctorData] = useState<any>({});
    const [successMessage, setSuccessMessage] = useState<string>('');
    const [showSuccessMessage, setShowSuccessMessage] = useState<boolean>(false);
    const [showErrorMessage, setShowErrorMessage] = useState<boolean>(false);
    const router = useRouter();

    useEffect(() => {
        const fetchDoctorData = async () => {
            try {
                const response = await fetch(`http://localhost:8080/api/doctor/search/${params.id}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch doctor data');
                }
                const doctorData = await response.json();
                setDoctorData(doctorData);
            } catch (error) {
                console.error('Error fetching doctor data:', error);
            }
        };

        fetchDoctorData();
    }, [params.id]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setDoctorData((prevState: any) => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await fetch(`http://localhost:8080/api/doctor/update/${params.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    id: params.id,
                    firstName: doctorData.firstName,
                    lastName: doctorData.lastName,
                    position: doctorData.position,
                    office: doctorData.office,
                    work_experience: doctorData.work_experience,
                    specialtyId: doctorData.specialtyId,
                    userId: doctorData.userId

                })
            });
            if (!response.ok) {
                throw new Error('Failed to update doctor data');

            }
            console.log('Successfully');
            setSuccessMessage('Данные успешно обновлены!')
            setShowSuccessMessage(true);

        } catch (error) {
            console.error('Error updating doctor:', error);
            setSuccessMessage('Произошла ошибка при обновлении данных');
            setShowErrorMessage(true);
        }
    };

    return (
        <div>
            <button className={styles.return} onClick={() => router.back()}>
                Назад
            </button>
            <form className={styles.formContainer} onSubmit={handleSubmit}>
                <h1>Редактирование доктора #{params.id}</h1>
                <label>
                    Имя:
                    <input type="text" name="firstName" value={doctorData.firstName || ''} onChange={handleInputChange} />
                </label><br />
                <label>
                    Фамилия:
                    <input type="text" name="lastName" value={doctorData.lastName || ''} onChange={handleInputChange} />
                </label><br />
                <label>
                    Должность:
                    <input type="text" name="position" value={doctorData.position || ''} onChange={handleInputChange} />
                </label><br />
                <label>
                    Кабинет:
                    <input type="text" name="office" value={doctorData.office || ''} onChange={handleInputChange} />
                </label><br />
                <label>
                    Опыт работы:
                    <input type="text" name="work_experience" value={doctorData.work_experience || ''} onChange={handleInputChange} />
                </label><br />
                <button type="submit">Сохранить изменения</button>
                {showSuccessMessage && (
                    <div className={styles.successMessage}>{successMessage}</div>
                )}
                {showErrorMessage && (
                    <div className={styles.errorMessage}>{successMessage}</div>
                )}
            </form>
        </div>
    );
};

export default EditDoctor;