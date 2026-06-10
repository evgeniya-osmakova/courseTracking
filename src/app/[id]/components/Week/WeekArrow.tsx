import classNames from 'classnames';
import React from 'react';

import styles from './styles.module.css';

type Props = {
    arrowType: 'previous' | 'next',
    currentWeek: number;
    changeWeek: (currentWeek: number) => void;
    weeksCount: number;
}

export const WeekArrow = (props: Props) => {
    const isFirstWeek = props.currentWeek === 1;
    const isLastWeek = props.currentWeek === props.weeksCount;

    const isInactive = isFirstWeek && props.arrowType === 'previous' || isLastWeek && props.arrowType === 'next';

    const nextWeekNumber = props.arrowType === 'next'
        ? props.currentWeek + 1
        : props.currentWeek - 1;

    const weekClassName = isInactive
        ? classNames(styles.arrow, styles.inactiveArrow)
        : styles.arrow;

    const changeWeek = isInactive
        ? undefined
        : () => props.changeWeek(nextWeekNumber);


    const title = isInactive
        ? undefined
        : props.arrowType === 'previous'
            ? 'Select previous week'
            : 'Select next week';

    const arrow = props.arrowType === 'previous'
        ? '<'
        : '>';

    return (
        <button
            className={ weekClassName }
            disabled={isInactive}
            onClick={ changeWeek }
            title={ title }
            type="button"
        >
            {arrow}
        </button>
    );
};
