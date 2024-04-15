'use client'


import { HeaderProps } from './Header.props';
import cn from 'classnames';
import styles from './Header.module.css';
import LogoIcon from './logoHosp.svg';
import LoginIcon from './LoginIcon.svg';
import LogoutIcon from './LogoutIcon.svg';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { Specialty } from '@/interfaces/specialization.interface';
import { eraseCookie, getCookie } from '@/utils/setCookie';
import { useRouter } from 'next/navigation';



export const Header = ({ className, ...props }: HeaderProps): JSX.Element => {

    const [specialization, setSpecialization] = useState<Specialty[]>([])
    const [isLogin, setIsLogin] = useState(!!getCookie("accessToken"));
    const router = useRouter();

    useEffect(() => {
        setIsLogin(!!getCookie("accessToken"));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [getCookie("accessToken")]);

    useEffect(() => {
        // Fetch data from the API
        fetch("http://localhost:8080/api/specialty/all")
            .then(response => response.json())
            .then((data: Specialty[]) => {
                console.log('Received data:', data);
                setSpecialization(data);
            })
            .catch(error => console.error('Error fetching data:', error));
    }, []);

    function logout(e: MouseEvent) {
        e.preventDefault();
        eraseCookie("accessToken");
        console.log("Выход из аккаунат успешно совершен!");
        router.refresh();

    }

    return (
        <header className={cn(className, styles.header)} {...props}>
            <div className={styles.navbar}>
                <Link href='../'><LogoIcon className={styles.logo} /></Link>
                <ul className={styles.ul}>
                    <li className={styles.dropdownParent}>Врачи
                        <ul className={styles.dropdown}>
                            {specialization.map(special => (
                                <li key={special.id}><Link href={`/Doctorsss/${encodeURIComponent(special.name)}`}>
                                    <span>{special.name}</span>
                                </Link></li>))}
                        </ul>
                    </li>
                    <Link href='/'><li>Услуги</li></Link>
                    <Link href='/'><li>Мед. карта</li></Link>
                    <Link href='/'><li>О нас</li></Link>
                </ul>
                <div className={styles.phoneNumbers}>
                    <p>8 (900) 589-52-17</p>
                    <p>8 (904) 599-87-15</p>
                    <p className={styles.freeCall}>Бесплатный звонок по России</p>
                </div>
                {!isLogin && (
                    <Link href="../sign-in/"><LoginIcon className={styles.login} placeholder="Войти" /> </Link>
                )}

                {isLogin && (
                    <Link href="/"><LogoutIcon className={styles.logout} onClick={logout} placeholder="Выход" /> </Link>
                )}
            </div>
        </header>
    );
};
