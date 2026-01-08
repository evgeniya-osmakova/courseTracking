import React, { InputHTMLAttributes, RefObject } from 'react';

import styles from './styles.module.css';

interface Props extends Omit<InputHTMLAttributes<HTMLInputElement>, 'onChange'>{
    label: string;
    onChange?: (value: string) => void;
    ref?: RefObject<HTMLInputElement | null>
}

export const FormField = ({ label, onChange, ...props }: Props) => {
    const id = props.id ?? props.name ?? props.type;

    return (
        <label
            className={styles.label}
            htmlFor={ id }
        >
            <p>
                { label }
            </p>

            <input
                {...props}
                id={ id }
                className={ styles.field }
                onChange={ onChange
                    ? (e) => onChange(e.target.value)
                    : undefined
                }
                type={ props.type ?? 'text' }
            />
        </label>
    );
};
