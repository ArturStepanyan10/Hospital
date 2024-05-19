'use client'

import { HeaderProps } from './HeaderForAdmin.props';
import cn from 'classnames';
import styles from './HeaderForAdmin.module.css';
import LogoIcon from './logoHosp.svg';
import LoginIcon from './LoginIcon.svg';
import LogoutIcon from './LogoutIcon.svg';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import React from 'react';
import { eraseCookie, getCookie } from '../../utils/setCookie';
import { decodeJWTToken } from '../../utils/decodeJWT';
import { useRouter } from 'next/navigation';


export const HeaderForAdmin = ({ className, ...props }: HeaderProps): JSX.Element => {
    const [isLogin, setIsLogin] = useState(false);
    const router = useRouter();
    const [userLastName, setUserLastName] = useState("");


    useEffect(() => {
        if (typeof window !== 'undefined') {
            setIsLogin(!!getCookie("accessToken"));

        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [!!getCookie("accessToken")]);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const token = getCookie("accessToken");
            if (token) {
                //const decodedToken = decodeJWTToken(token);
                //console.log(decodedToken);
                //setUserLastName(decodedToken.lastName);
            }
        }
    }, []);

    function logout(e: React.MouseEvent) {
        e.preventDefault();
        const confirmed = window.confirm("Точно ли хотите выйти ?");
        if (confirmed) {
            eraseCookie("accessToken");
            console.log("Выход из аккаунта успешно выполнен!");
            if (typeof window !== 'undefined') {
                router.push('/adminSide');
                setIsLogin(false);
            }
        }
    }

    return (
        <header className={cn(className, styles.header)} {...props}>
            <div className={styles.navbar}>
                <Link href='/adminSide'><LogoIcon className={styles.logo} /></Link>
                {!isLogin && (
                    <Link href="../sign-in/"><LoginIcon className={styles.login} /> </Link>
                )}
                {isLogin && (
                    <div>
                        <Link href="/adminSide">
                            <LogoutIcon className={styles.logout} onClick={logout} />
                        </Link>
                        <div>{userLastName}</div>
                    </div>
                )}
            </div>
        </header>
    );
};
