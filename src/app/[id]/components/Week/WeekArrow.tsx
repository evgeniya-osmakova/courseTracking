import classNames from 'classnames';
import React from 'react';

import styles from '@/app/[id]/components/Week/styles.module.css';

type Props = {
    arrowType: 'previous' | 'next',
    currentWeek: number;
    changeWeek: (currentWeek: number) => void;
    weeksCount: number;
}

export const WeekArrow: React.FC<Props> = (props) => {
    const isFirstWeek = props.currentWeek === 1;
    const isLastWeek = props.currentWeek === props.weeksCount;
    const isInactive = isFirstWeek && props.arrowType === 'previous' || isLastWeek && props.arrowType === 'next';

    const getWeekClassName = () => {
        return isInactive
            ? classNames(styles.arrow, styles.inactiveArrow)
            : styles.arrow;
    };

    const changeWeek = () => {
        const nextWeekNumber = props.arrowType === 'next'
            ? props.currentWeek + 1
            : props.currentWeek - 1;

        return isInactive
            ? undefined
            : () => props.changeWeek(nextWeekNumber);
    };

    const getTitle = () => {
        return isInactive
            ? undefined
            : 'Select previous week';
    };

    return (
        <div
            className={ getWeekClassName() }
            onClick={ changeWeek() }
            title={ getTitle() }
        >
            {props.arrowType === 'previous'
                ? '\u276E'
                : '\u276F'
            }
        </div>
    );
};
