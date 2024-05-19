import Link from 'next/link';
import styles from './page.module.css';
import { getCookie } from '../../utils/setCookie';

const AdminPage = () => {
    const isUserLoggedIn = !!getCookie("accessToken");

    return (
        <div>
            {isUserLoggedIn ? (
                <Link href='../sign-in/'>
                    <h1 className={styles.cardContainer}>Врачи</h1>
                </Link>) : (
                <Link href='/adminSide/AdminDoctors'>
                    <h1 className={styles.cardContainer}>Врачи</h1>
                </Link>)}

            {isUserLoggedIn ? (
                <Link href='../sign-in/'>
                    <h1 className={styles.cardContainer}>Пациенты</h1>
                </Link>) : (<Link href='/adminSide/AdminPatients'>
                    <h1 className={styles.cardContainer}>Пациенты</h1>
                </Link>)}

            {isUserLoggedIn ? (
                <Link href='../sign-in/'>
                    <h1 className={styles.cardContainer}>Услуги</h1>
                </Link>) : (<Link href='/adminSide/AdminServices'>
                    <h1 className={styles.cardContainer}>Услуги</h1>
                </Link>)}

            {isUserLoggedIn ? (
                <Link href='../sign-in/'>
                    <h1 className={styles.cardContainer}>Создать расписание</h1>
                </Link>) : (<Link href='/adminSide/AdminSchedules'>
                    <h1 className={styles.cardContainer}>Создать расписание</h1>
                </Link>)}

            {isUserLoggedIn ? (
                <Link href='../sign-in/'>
                    <h1 className={styles.cardContainer}>Специальности</h1>
                </Link>) : (<Link href='/adminSide/AdminSpeciality'>
                    <h1 className={styles.cardContainer}>Специальности</h1>
                </Link>)}
        </div>
    );

};

export default AdminPage;