import React from 'react';
import classNames from 'classnames';

import styles from './styles.module.css';

type Props = {
    day: string;
    index: number;
    currentDay: number;
    changeDay: (index: number) => void;
}

export const Day: React.FC<Props> = (props) => {
    return (
        <th
            key={ props.day }
            className={
                props.currentDay === props.index + 1
                    ? classNames(styles.day, styles.currentDay)
                    : styles.day
            }
            onClick={
                props.currentDay === props.index + 1
                    ? undefined
                    : () => props.changeDay(props.index + 1)
            }
            title={ 'Change selected day' }
        >
            { props.day }
        </th>
    );
};
