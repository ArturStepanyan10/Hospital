'use client'


import { ChangeEvent, useState } from 'react';
import { Input } from '../../../../components';
import styles from './CreateDoctor.module.css'
import { postFetch } from '../../../../utils/Fetch';
import { setCookie } from '../../../../utils/setCookie';
import { useRouter } from 'next/navigation';


const CreateDoctor = () => {
    const [isLoading, setLoading] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [lastName, setLastName] = useState("");
    const [firstName, setFirstName] = useState("");
    const [specialtyId, setSpecId] = useState<number>();
    const [position, setPosition] = useState("");
    const [office, setOffice] = useState("");
    const [work_experience, setWorkExperience] = useState<number>();
    const [successMessage, setSuccessMessage] = useState<string>('');
    const [showSuccessMessage, setShowSuccessMessage] = useState<boolean>(false);
    const [showErrorMessage, setShowErrorMessage] = useState<boolean>(false);
    const router = useRouter();

    function handleEmailChange(e: ChangeEvent<HTMLInputElement>) {
        setEmail(e.target.value);
    }

    function handlePasswordChange(e: ChangeEvent<HTMLInputElement>) {
        setPassword(e.target.value);
    }

    function handleFirstNameChange(e: ChangeEvent<HTMLInputElement>) {
        setFirstName(e.target.value);
    }

    function handleLastNameChange(e: ChangeEvent<HTMLInputElement>) {
        setLastName(e.target.value);
    }

    function handleSpecIdChange(e: ChangeEvent<HTMLInputElement>) {
        setSpecId(Number(e.target.value));
    }

    function handlePositionChange(e: ChangeEvent<HTMLInputElement>) {
        setPosition(e.target.value);
    }

    function handleOfficeChange(e: ChangeEvent<HTMLInputElement>) {
        setOffice(e.target.value);
    }

    function handleExperienceChange(e: ChangeEvent<HTMLInputElement>) {
        setWorkExperience(Number(e.target.value));
    }


    function FormHandler(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        postFetch("http://localhost:8080/api/auth/register-doctor", {
            email,
            password,
            firstName,
            lastName,
            specialtyId,
            position,
            office,
            work_experience
        })
            .then(token => {
                console.log("Successfully");
                // Просто сохраняем токен как строку
                setCookie("accessToken", token, 4);
                setSuccessMessage('Доктор зарегистрирован')
                setShowSuccessMessage(true);
                //Всплывающее сообщение об успешном сохранении
            })
            .catch(error => {
                console.error("Error during sign in:", error);
                setSuccessMessage('Произошла ошибка!')
                setShowErrorMessage(true);
            });
    }

    return (
        <><button className={styles.return} onClick={() => router.back()}>
            Назад
        </button>
            <div className={styles.formContainer}>

                <h1>Регистрация врача</h1>
                <form onSubmit={FormHandler}>
                    <Input
                        onChange={handleEmailChange}
                        type="email"
                        placeholder="E-mail"
                        value={email} /> <br />
                    <Input
                        onChange={handlePasswordChange}
                        type="password"
                        placeholder="Пароль"
                        value={password} /> <br />
                    <Input
                        onChange={handleLastNameChange}
                        type="text"
                        placeholder="Фамилия"
                        value={lastName} /> <br />
                    <Input
                        onChange={handleFirstNameChange}
                        type="text"
                        placeholder="Имя"
                        value={firstName} /> <br />
                    <Input
                        onChange={handleSpecIdChange}
                        type="text"
                        placeholder="Специальность (id)"
                        value={specialtyId !== undefined ? specialtyId.toString() : ''} /> <br />
                    <Input
                        onChange={handlePositionChange}
                        type="text"
                        placeholder="Должность"
                        value={position} /> <br />
                    <Input
                        onChange={handleOfficeChange}
                        type="text"
                        placeholder="Кабинет"
                        value={office} /> <br />
                    <Input
                        onChange={handleExperienceChange}
                        type="text"
                        placeholder="Стаж"
                        value={work_experience !== undefined ? work_experience.toString() : ''} />

                    <button type='submit' disabled={isLoading}>
                        {isLoading ? "Подождите..." : "Зарегистрировать"}
                    </button><br />
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

export default CreateDoctor;