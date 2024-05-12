'use client'

import { ChangeEvent, useState } from 'react';
import styles from './createServices.module.css'
import { Button, Input } from '../../../../components';
import Link from 'next/link';

const CreateServices = () => {
    const [id, setId] = useState<number>();
    const [name, setName] = useState<string>("");
    const [price, setPrice] = useState<number>();
    const [description, setDescription] = useState<string>("");

    function handledIdSetServiceChange(e: ChangeEvent<HTMLInputElement>) {
        setId(parseInt(e.target.value));
    }

    function handledNameChange(e: ChangeEvent<HTMLInputElement>) {
        setName(e.target.value);
    }

    const handlePriceChange = (e: ChangeEvent<HTMLInputElement>) => {
        setPrice(parseInt(e.target.value));
    }

    const handleDescriptionChange = (e: ChangeEvent<HTMLInputElement>) => {
        setDescription(e.target.value);
    }



    const submitAdmission = async () => {
        try {

            const response = await fetch('http://localhost:8080/api/medical-service/create', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    id: id,
                    name: name,
                    price: price,
                    description: description
                }),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            console.log('Success!');


        } catch (error) {
            console.error('Error:', error);

        }
    };

    return (

        <div className={styles.formContainer}>
            <h1>Создание расписания</h1>
            <form >
                <Input
                    onChange={handledIdSetServiceChange}
                    type="text"
                    placeholder="Услуга (id)"
                    value={id !== undefined ? id.toString() : ''}
                /> <br />
                <Input
                    onChange={handledNameChange}
                    type="text"
                    placeholder="Название услуги"
                    value={name}
                /> <br />
                <Input
                    onChange={handlePriceChange}
                    type="text"
                    placeholder="Стоимость"
                    value={price !== undefined ? price.toString() : ''}
                /> <br />
                <Input
                    onChange={handleDescriptionChange}
                    type="text"
                    placeholder="Описание услуги"
                    value={description}
                />

                <Button type='submit' className={styles.button} onClick={submitAdmission} appearance='primary'>
                    Создать услугу
                </Button>
            </form>
        </div>

    )
}

export default CreateServices;