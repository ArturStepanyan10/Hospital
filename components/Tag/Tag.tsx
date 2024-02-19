import { TagProps } from './Tag.props';
import styles from './Tag.module.css';
import cn from 'classnames';


export const Tag = ({ appearance = 'm', children, href, color = 'ghost', className, ...props }: TagProps): JSX.Element => {
    return (
        <div
            className={cn(styles.tag, className, {
                [styles.s]: appearance == 's',
                [styles.m]: appearance == 'm',
                [styles.ghost]: color == 'ghost',
                [styles.red]: color == 'red',
                [styles.grey]: color == 'grey',
                [styles.green]: color == 'green',
                [styles.primary]: color == 'primary',


            })}
            {...props}
        >
            {
                href
                    ? <a href={href}>{children}</a>
                    : <>{children}</>
            }

        </div>
    );
}
