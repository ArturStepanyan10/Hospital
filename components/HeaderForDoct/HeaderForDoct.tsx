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



export const HeaderForDoct = ({ className, ...props }: HeaderProps): JSX.Element => {
    const [isLogin, setIsLogin] = useState(false);
    const router = useRouter();
    const [userLastName, setUserLastName] = useState<string>("");
    const [docId, setDocId] = useState<number>(0);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            setIsLogin(!!getCookie("accessToken"));
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [getCookie("accessToken")]);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const token = getCookie("accessToken");
            if (token) {
                const decodedToken = decodeJWTToken(token);
                setUserLastName(decodedToken.lastName);
                setDocId(decodedToken.id);
            }
        }
    }, []);

    function logout(e: MouseEvent) {
        e.preventDefault();
        const confirmed = window.confirm("Точно ли хотите выйти ?");
        if (confirmed) {
            eraseCookie("accessToken");
            console.log("Выход из аккаунта успешно выполнен!");
            if (typeof window !== 'undefined') {
                router.push('/doctorSide');
                setIsLogin(false);
            }
        }

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

