import React, { InputHTMLAttributes, RefObject } from 'react'

import styles from './styles.module.css';

interface Props extends Omit<InputHTMLAttributes<HTMLInputElement>, 'onChange'>{
    label: string;
    onChange?: (value: string) => void;
    ref?: RefObject<HTMLInputElement | null>
}

export const FormField: React.FC<Props> = (props) => {
    return (
        <label
            className={styles.label}
            htmlFor={ props.type }
        >
            <p>
                { props.label }
            </p>

            <input
                {...props}
                className={ styles.field }
                onChange={ props.onChange
                    ? (e) => props.onChange!(e.target.value)
                    : undefined
                }
                type={ props.type ?? 'text' }
                autoComplete="true"
            />
        </label>
    );
};
