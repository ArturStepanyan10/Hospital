import { HeaderProps } from './Header.props';
import cn from 'classnames';
import styles from './Header.module.css';
import LogoIcon from './logoHosp.svg';
import LoginIcon from './LoginIcon.svg';


export const Header = ({ className, ...props }: HeaderProps): JSX.Element => {
    return (
        <header className={cn(className, styles.header)} {...props}>
            <div className={cn(styles.navbar)}>
                <a href='../'><LogoIcon className={cn(styles.logo)} /></a>
                <ul className={cn(styles.ul)}>
                    <li>Врачи</li>
                    <li>Запись на прием</li>
                    <li>Мед. карта</li>
                    <li>О нас</li>
                </ul>
                <div className={styles.phoneNumbers}>
                    <p>8 (900) 589-52-17</p>
                    <p>8 (904) 599-87-15</p>
                    <p className={styles.freeCall}>Бесплатный звонок по России</p>
                </div>
                <a href="../login/" target="_black"><LoginIcon className={styles.login} /></a>
            </div>
        </header>
    )
}



