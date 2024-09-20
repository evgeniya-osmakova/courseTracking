import React, { InputHTMLAttributes } from 'react';

import styles from './styles.module.css';

interface Props extends Omit<InputHTMLAttributes<HTMLInputElement>, 'onChange'>{
    label: string;
    onChange: (value: string) => void;
}

export const FormField: React.FC<Props> = (props) => {
    return (
        <label htmlFor={ props.type }>
            <p>{ props.label }</p>

            <input
                className={ styles.field }
                onChange={ (e) => props.onChange(e.target.value) }
                required
                type={ props.type }
                name={ props.type }
                id={ props.type }
                placeholder={props.placeholder}
                autoComplete="true"
            />
        </label>
    );
};
