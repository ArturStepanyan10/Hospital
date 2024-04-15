'use client'


import { Input } from '@/components/Input/Input';
import { postFetch } from '@/utils/Fetch';
import { setCookie } from '@/utils/setCookie';
import Link from 'next/link';
import styles from './register.module.css';
import { useRouter } from 'next/navigation';
import React, { ChangeEvent, useEffect, useState } from 'react';


const Register: React.FC = () => {
    const [isLoading, setLoading] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [firstName, setName] = useState("");
    const [lastName, setSurname] = useState("");
    const [age, setAge] = useState<number>();
    const [phoneNumber, setPhoneNumber] = useState("");
    const [snils, setSnils] = useState("");
    const router = useRouter();

    useEffect(() => {
        router.prefetch('/');
    }, [router]);


    function handleEmailChange(e: ChangeEvent<HTMLInputElement>) {
        setEmail(e.target.value);
    }

    function handlePasswordChange(e: ChangeEvent<HTMLInputElement>) {
        setPassword(e.target.value);
    }

    function handleFirstNameChange(e: ChangeEvent<HTMLInputElement>) {
        setName(e.target.value);
    }

    function handleLastNameChange(e: ChangeEvent<HTMLInputElement>) {
        setSurname(e.target.value);
    }

    function handleAgeChange(e: ChangeEvent<HTMLInputElement>) {
        setAge(parseInt(e.target.value));
    }

    function handlePhoneNumberChange(e: ChangeEvent<HTMLInputElement>) {
        setPhoneNumber(e.target.value);
    }

    function handleSnilsChange(e: ChangeEvent<HTMLInputElement>) {
        setSnils(e.target.value);
    }

    function FormHandler(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        postFetch("http://localhost:8080/api/auth/register-patient", {
            email,
            password,
            firstName,
            lastName,
            age,
            phoneNumber,
            snils
        })
            .then(token => {
                console.log("Successfully");
                // Просто сохраняем токен как строку
                setCookie("accessToken", token, 2);
                router.push('./sign-in');
            })
            .catch(error => {
                console.error("Error during sign in:", error);
            });
    }

    return (

        <div className={styles.formContainer}>
            <h1>Регистрация</h1>
            <form onSubmit={FormHandler}>
                <Input
                    onChange={handleEmailChange}
                    type="email"
                    placeholder="E-mail"
                    value={email}
                /> <br />
                <Input
                    onChange={handlePasswordChange}
                    type="password"
                    placeholder="Пароль"
                    value={password}
                /> <br />
                <Input onChange={handleFirstNameChange}
                    type="text"
                    placeholder="Имя"
                    value={firstName}
                /> <br />
                <Input onChange={handleLastNameChange}
                    type="text"
                    placeholder="Фамилия"
                    value={lastName}
                /> <br />
                <Input onChange={handleAgeChange}
                    type="text"
                    placeholder="Возраст"
                    value={age !== undefined ? age.toString() : ''} /> <br />
                <Input onChange={handlePhoneNumberChange}
                    type="text"
                    placeholder="Номер телефона"
                    value={phoneNumber} /> <br />
                <Input onChange={handleSnilsChange}
                    type="text"
                    placeholder="СНИЛС"
                    value={snils} /> <br />

                <button type='submit' disabled={isLoading}>
                    {isLoading ? "Подождите..." : "Зарегистрироваться"}
                </button><br />
                <Link href="/sign-in">Войти</Link>
            </form>
        </div>
    );
};

export default Register;

