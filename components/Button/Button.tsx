import styles from './Button.module.css';
import { ButtonProps } from './Button.props';
import cn from 'classnames';


export const Button = ({ appearance, arrow = 'none', children, className, ...props }: ButtonProps): JSX.Element => {
    return (
        <button
            className={cn(styles.button, className, {
                [styles.primary]: appearance == 'primary',
                [styles.ghost]: appearance == 'ghost',
                [styles.delete]: appearance == 'delete',
                [styles.create]: appearance == 'create',
            })}
            {...props}
        >
            {children}
            {arrow != 'none' && <span className={cn(styles.arrow,
                { [styles.down]: arrow == 'down' })}>
                d
            </span>}
        </button>
    )
}