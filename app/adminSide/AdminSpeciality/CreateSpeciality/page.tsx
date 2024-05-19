'use client'

import { ChangeEvent, useState } from 'react';
import styles from './CreateSpecialty.module.css'
import { Button, Input } from '../../../../components';
import { useRouter } from 'next/navigation';

const CreateSpeciality = () => {
    const [name, setName] = useState<string>("");
    const [successMessage, setSuccessMessage] = useState<string>('');
    const [showSuccessMessage, setShowSuccessMessage] = useState<boolean>(false);
    const [showErrorMessage, setShowErrorMessage] = useState<boolean>(false);
    const router = useRouter();

    function handledNameChange(e: ChangeEvent<HTMLInputElement>) {
        setName(e.target.value);
    }

    const submitAdmission = async () => {
        try {

            const response = await fetch('http://localhost:8080/api/specialty/new-spec', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name: name,
                }),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            console.log('Success!');
            setSuccessMessage('Специльность добавлена')
            setShowSuccessMessage(true);



        } catch (error) {
            console.error('Error:', error);
            setSuccessMessage('Произошла ошибка при обновлении данных');
            setShowErrorMessage(true);

        }
    };

    return (
        <><button className={styles.return} onClick={() => router.back()}>
            Назад
        </button><div className={styles.formContainer}>

                <h1>Создание специальности</h1>
                <form>
                    <Input
                        onChange={handledNameChange}
                        type="text"
                        placeholder="Название специальности"
                        value={name} /> <br />

                    <Button type='submit' className={styles.button} onClick={submitAdmission} appearance='primary'>
                        Создать услугу
                    </Button>
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

export default CreateSpeciality;