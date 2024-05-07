'use client'

import { HeaderProps } from './HeaderForDoct.props';
import cn from 'classnames';
import styles from './HeaderForDoct.module.css';
import LogoIcon from './logoHosp.svg';
import LoginIcon from './LoginIcon.svg';
import LogoutIcon from './LogoutIcon.svg';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import React from 'react';
import { eraseCookie, getCookie } from '../../utils/setCookie';
import { decodeJWTToken } from '../../utils/decodeJWT';
import { Patient } from '../../interfaces/patient.interface';



export const HeaderForDoct = ({ className, ...props }: HeaderProps): JSX.Element => {
    const [isLogin, setIsLogin] = useState(!!getCookie("accessToken"));
    const router = useRouter();
    const [userLastName, setUserLastName] = useState<string>("");
    const [docId, setDocId] = useState<number>(0);

    useEffect(() => {
        setIsLogin(!!getCookie("accessToken"));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [getCookie("accessToken")]);

    useEffect(() => {
        const token = getCookie("accessToken");
        if (token) {
            const decodedToken = decodeJWTToken(token);
            setUserLastName(decodedToken.lastName);
            setDocId(decodedToken.id);
        }
    }, []);

    function logout(e: MouseEvent) {
        e.preventDefault();
        eraseCookie("accessToken");
        console.log("Выход из аккауната успешно совершен!");
        router.refresh();
    }


    return (
        <header className={cn(className, styles.header)} {...props}>
            <div className={styles.navbar}>
                <Link href='/doctorSide'><LogoIcon className={styles.logo} /></Link>
                <ul className={styles.ul}>
                    <Link href='/doctorSide'><li>Пациенты</li></Link>
                    <Link href={`doctorSide/Schedule/${docId}`}><li>Расписание</li></Link>
                </ul>
                {!isLogin && (
                    <Link href="../sign-in/"><LoginIcon className={styles.login} placeholder="Войти" /> </Link>
                )}
                {isLogin && (
                    <div>
                        <Link href="/doctorSide">
                            <LogoutIcon className={styles.logout} onClick={logout} placeholder="Выход" />
                        </Link>
                        <div>{userLastName}</div>
                    </div>
                )}
            </div>
        </header>
    );
};

