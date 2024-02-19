import { PProps } from './P.props';
import styles from './P.module.css';
import cn from 'classnames';


export const P = ({ appearance = 'm', children, className, ...props }: PProps): JSX.Element => {
    return (
        <p
            className={cn(styles.p, className, {
                [styles.s]: appearance == 's',
                [styles.m]: appearance == 'm',
                [styles.l]: appearance == 'l',
            })}
            {...props}
        >
            {children}
        </p>
    );
}


