'use client'

import { HeaderProps } from './HeaderForAdmin.props';
import cn from 'classnames';
import styles from './HeaderForAdmin.module.css';
import LogoIcon from './logoHosp.svg';
import LoginIcon from './LoginIcon.svg';
import LogoutIcon from './LogoutIcon.svg';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import React from 'react';
import { eraseCookie, getCookie } from '../../utils/setCookie';
import { decodeJWTToken } from '../../utils/decodeJWT';



export const HeaderForAdmin = ({ className, ...props }: HeaderProps): JSX.Element => {
    const [isLogin, setIsLogin] = useState(!!getCookie("accessToken"));
    const router = useRouter();
    const [userLastName, setUserLastName] = useState<string>("");

    useEffect(() => {
        setIsLogin(!!getCookie("accessToken"));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [getCookie("accessToken")]);

    useEffect(() => {
        const token = getCookie("accessToken");
        if (token) {
            const decodedToken = decodeJWTToken(token);
            setUserLastName(decodedToken.lastName);
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
                <Link href='/adminSide'><LogoIcon className={styles.logo} /></Link>
                <ul className={styles.ul}>
                    <Link href='/'><li>Врачи</li></Link>
                    <Link href='/'><li>Расписание</li></Link>
                </ul>
                {!isLogin && (
                    <Link href="../sign-in/"><LoginIcon className={styles.login} placeholder="Войти" /> </Link>
                )}
                {isLogin && (
                    <div>
                        <Link href="/">
                            <LogoutIcon className={styles.logout} onClick={logout} placeholder="Выход" />
                        </Link>
                        <div>{userLastName}</div>
                    </div>
                )}
            </div>
        </header>
    );
};

