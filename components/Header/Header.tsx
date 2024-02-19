import { HeaderProps } from './Header.props';
import cn from 'classnames';
import styles from './Header.module.css';
import LogoIcon from './logoHosp.svg';


export const Header = ({ className, ...props }: HeaderProps): JSX.Element => {
    return (

        <header className={cn(className, styles.header)} {...props}>
            <div>
                <a href='../'><LogoIcon className={cn(styles.logo)} /></a>

                <div className={cn(styles.nav)}>
                    <ul>
                        <li><a href='#'>Нав1</a></li>
                        <li><a href='#'>Нав2</a></li>
                        <li><a href='#'>Нав3</a></li>
                        <li><a href='#'>Нав4</a></li>
                    </ul>
                </div>
            </div>
        </header>

    )
}