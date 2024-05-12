'use client'

import { useEffect, useState } from 'react';
import styles from './EditService.module.css'


const EditServices = ({ params }: { params: { id: number } }) => {
    const [serviceData, setServiceData] = useState<any>({});
    const [successMessage, setSuccessMessage] = useState<string>('');

    useEffect(() => {
        const fetchServiceData = async () => {
            try {
                const response = await fetch(`http://localhost:8080/api/medical-service/search/${params.id}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch service data');
                }
                const serviceData = await response.json();
                setServiceData(serviceData);
            } catch (error) {
                console.error('Error fetching service data:', error);
            }
        };

        fetchServiceData();
    }, [params.id]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setServiceData((prevState: any) => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await fetch(`http://localhost:8080/api/medical-service/update/${params.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    id: params.id,
                    name: serviceData.name,
                    price: serviceData.price,
                    description: serviceData.description,

                })
            });
            if (!response.ok) {
                throw new Error('Failed to update service data');
            }

            setSuccessMessage('Изменения успешно сохранены');
            setTimeout(() => {
                setSuccessMessage('');
            }, 3000);
            console.log('Successfully');
        } catch (error) {
            console.error('Error updating service data:', error);
        }
    };

    return (
        <div>


            <form className={styles.formContainer} onSubmit={handleSubmit}>
                <h1>Редактирование сервиса #{params.id}</h1>
                <label>
                    Название услуги:
                    <input type="text" name="name" value={serviceData.name || ''} onChange={handleInputChange} />
                </label><br />
                <label>
                    Стоимость:
                    <input type="text" name="price" value={serviceData.price || ''} onChange={handleInputChange} />
                </label><br />
                <label>
                    Описание:
                    <input type="text" name="description" value={serviceData.description || ''} onChange={handleInputChange} />
                </label><br />
                <button type="submit">Сохранить изменения</button>
                {successMessage && (
                    <div className={styles.successMessage}>{successMessage}</div>
                )}
            </form>
        </div>
    );
}

export default EditServices;