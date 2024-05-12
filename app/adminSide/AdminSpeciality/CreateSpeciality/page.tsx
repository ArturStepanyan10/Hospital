'use client'

import { ChangeEvent, useState } from 'react';
import styles from './CreateSpecialty.module.css'
import { Button, Input } from '../../../../components';

const CreateSpeciality = () => {
    const [id, setId] = useState<number>();
    const [name, setName] = useState<string>("");


    function handledIdSetSpecialityChange(e: ChangeEvent<HTMLInputElement>) {
        setId(parseInt(e.target.value));
    }

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
                    id: id,
                    name: name,
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
            <h1>Создание специальности</h1>
            <form >
                <Input
                    onChange={handledIdSetSpecialityChange}
                    type="text"
                    placeholder="Специальность (id)"
                    value={id !== undefined ? id.toString() : ''}
                /> <br />
                <Input
                    onChange={handledNameChange}
                    type="text"
                    placeholder="Название специальности"
                    value={name}
                /> <br />

                <Button type='submit' className={styles.button} onClick={submitAdmission} appearance='primary'>
                    Создать услугу
                </Button>
            </form>
        </div>

    )
}

export default CreateSpeciality;