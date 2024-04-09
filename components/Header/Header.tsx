'use client'


import { HeaderProps } from './Header.props';
import cn from 'classnames';
import styles from './Header.module.css';
import LogoIcon from './logoHosp.svg';
import LoginIcon from './LoginIcon.svg';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { Specialty } from '@/interfaces/specialization.interface';


export const Header = ({ className, ...props }: HeaderProps): JSX.Element => {

    const [specialization, setSpecialization] = useState<Specialty[]>([])

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
                <Link href="../sign-in/"><LoginIcon className={styles.login} /> </Link>
            </div>
        </header>
    );
};
