import React from 'react';

import styles from './styles.module.css';

type Props = {
    formType: string;
    onChange: (value: string) => void;
    label: string;
    placeholder?: string;
}

export const FormField: React.FC<Props> = (props) => {
    return (
        <label htmlFor={ props.formType }>
            <p>{ props.label }</p>

            <input
                className={ styles.field }
                onChange={ (e) => props.onChange(e.target.value) }
                required
                type={ props.formType }
                name={ props.formType }
                id={ props.formType }
                placeholder={props.placeholder}
                autoComplete="true"
            />
        </label>
    );
};
