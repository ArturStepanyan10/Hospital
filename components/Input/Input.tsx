import React from 'react';
import { InputProps } from './Input.props';
import styles from './Input.module.css';
import cn from 'classnames';

export const Input = ({ className, children, type, placeholder, ...props }: InputProps): JSX.Element => {
    return (
        <label>
            <span>{children}</span>
            <input
                className={cn(className, styles.input)}
                type={type}
                placeholder={placeholder} {...props}
                required />
        </label>
    );
};
