'use client'

import { useEffect, useState } from 'react';
import styles from './EdtiPatient.module.css'
import { useRouter } from 'next/navigation';


const EditPatient = ({ params }: { params: { id: number } }) => {
    const [patientData, setPatientData] = useState<any>({});
    const [successMessage, setSuccessMessage] = useState<string>('');
    const [showSuccessMessage, setShowSuccessMessage] = useState<boolean>(false);
    const [showErrorMessage, setShowErrorMessage] = useState<boolean>(false);
    const router = useRouter();

    useEffect(() => {
        const fetchPatientData = async () => {
            try {
                const response = await fetch(`http://localhost:8080/api/patient/search/${params.id}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch patient data');
                }
                const patientData = await response.json();
                setPatientData(patientData);
            } catch (error) {
                console.error('Error fetching patient data:', error);
            }
        };

        fetchPatientData();
    }, [params.id]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setPatientData((prevState: any) => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await fetch(`http://localhost:8080/api/patient/update/${params.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    id: params.id,
                    firstName: patientData.firstName,
                    lastName: patientData.lastName,
                    age: patientData.age,
                    phoneNumber: patientData.phoneNumber,
                    snils: patientData.snils,
                    userId: patientData.userId

                })
            });
            if (!response.ok) {
                throw new Error('Failed to update patient data');
            }

            setSuccessMessage('Данные успешно обновлены!')
            setShowSuccessMessage(true);
            console.log('Successfully');
        } catch (error) {
            console.error('Error updating patient data:', error);
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
                <h1>Редактирование пациента #{params.id}</h1>
                <label>
                    Имя:
                    <input type="text" name="firstName" value={patientData.firstName || ''} onChange={handleInputChange} />
                </label><br />
                <label>
                    Фамилия:
                    <input type="text" name="lastName" value={patientData.lastName || ''} onChange={handleInputChange} />
                </label><br />
                <label>
                    Возраст:
                    <input type="text" name="age" value={patientData.age || ''} onChange={handleInputChange} />
                </label><br />
                <label>
                    Номер телефона:
                    <input type="text" name="phoneNumber" value={patientData.phoneNumber || ''} onChange={handleInputChange} />
                </label><br />
                <label>
                    СНИЛС:
                    <input type="text" name="snils" value={patientData.snils || ''} onChange={handleInputChange} />
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
}

export default EditPatient;