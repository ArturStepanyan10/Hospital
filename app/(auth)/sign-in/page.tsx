'use client';

import { Input } from '@/components/Input/Input';
import { postFetch } from '@/utils/Fetch';
import { setCookie } from '@/utils/setCookie';
import Link from 'next/link';
import styles from './signin.module.css';
import { useRouter } from 'next/navigation';

import React, { ChangeEvent, useEffect, useState } from 'react';

const SignIn: React.FC = () => {
    const [isLoading, setLoading] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState<string | null>(null);
    const [accessToken, setAccessToken] = useState("");

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

    function FormHandler(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setLoading(true);
        postFetch("http://localhost:8080/api/auth/signin", {
            email,
            password,
        })
            .then(token => {
                console.log("Successfully");
                setAccessToken(token);

                // Просто сохраняем токен как строку
                setCookie("accessToken", token, 2);
                setLoading(false);
                router.push('/');
            })
            .catch(error => {
                console.error("Error during sign in:", error);
                setError("Неправильный логин/пароль!");
                setLoading(false);
            });
    }

    return (
        <div className={styles.formContainer}>
            <h1>Авторизация</h1>
            <form onSubmit={FormHandler}>
                <Input
                    onChange={handleEmailChange}
                    type="email"
                    placeholder="E-mail"
                    value={email}
                />
                <br />
                <Input
                    onChange={handlePasswordChange}
                    type="password"
                    placeholder="Пароль"
                    value={password}
                /> <br />
                <button type='submit' disabled={isLoading}>
                    {isLoading ? "Подождите..." : "Войти"}
                </button> <br />
                <p className={styles.errorMsg}>{error}</p>
                <Link href="/register">Зарегистрироваться</Link>
            </form>
        </div>
    );
};

export default SignIn;
