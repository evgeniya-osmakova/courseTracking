import React from 'react';
import classNames from 'classnames';

import styles from './styles.module.css';

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
        : 'Select previous week';

    const arrow = props.arrowType === 'previous'
        ? '\u276E'
        : '\u276F';

    return (
        <div
            className={ weekClassName }
            onClick={ changeWeek }
            title={ title }
        >
            {arrow}
        </div>
    );
};
