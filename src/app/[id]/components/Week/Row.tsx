'use client';

import React from 'react';

import { WeekDay } from '@/types/Week';

import styles from './styles.module.css';

type Props = {
    name: string;
    data: WeekDay[];
    changeChecked: (checked: boolean, activityType: string, index: number) => void;
}

const daysCount = 6;

export const Row = (props: Props) => {
    const handleChange = (checked: boolean, index: number) => {
        return props.changeChecked(!checked, props.name, index);
    };

    const renderDay = () => {
        const dayList = [];

        for (let i = 0; i < daysCount; i++) {
            const isChecked = props.data.includes(i);

            dayList.push(
                <th key={i}>
                    <input
                        key={ i }
                        className={ styles.ckeckBox }
                        type="checkbox"
                        checked={ isChecked }
                        onChange={() => handleChange(isChecked, i)}
                    />
                </th>
            );
        }

        return dayList;
    };

    return (
        <tr>
            <th className={ styles.rowName }>
                { props.name }
            </th>

            {renderDay()}
        </tr>
    );
};
