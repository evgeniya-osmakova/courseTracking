'use client';

import classNames from 'classnames';

import { Day } from '@/app/[id]/components/Week/Day';
import { Row } from '@/app/[id]/components/Week/Row';
import { Course } from '@/types/Course';

import styles from './styles.module.css';

type Props = {
    course: Course;
    changeWeek: (index: number) => void;
    changeDay: (index: number) => void;
    changeChecked: (checked: boolean, activityType: string, index: number) => void;
}

const weekDays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sa'];

export const Week = (props: Props) => {
    const checkedList = props.course.checkedList[`week${props.course.currentWeek}`];

    const rowList = Object.keys(checkedList);

    const isFirstWeek = props.course.currentWeek === 1;
    const isLastWeek = props.course.currentWeek === Object.keys(props.course.videoList).length;

    const getWeekClassName = (showInactive: boolean) => {
        return (
            showInactive
                ? classNames(styles.arrow, styles.inactiveArrow)
                : styles.arrow
        );
    };

    return (
        <table className={styles.container}>
            <caption className={ styles.caption }>
                <div className={ styles.navigation }>
                    <div
                        className={getWeekClassName(isFirstWeek)}
                        onClick={
                            isFirstWeek
                                ? undefined
                                : () => props.changeWeek(props.course.currentWeek - 1)
                        }
                        title={
                            isFirstWeek
                                ? undefined
                                : 'Select previous week'
                        }
                    >
                        &#10094;
                    </div>

                    Week { props.course.currentWeek }

                    <div
                        className={getWeekClassName(isFirstWeek)}
                        onClick={
                            isLastWeek
                                ? undefined
                                : () => props.changeWeek(props.course.currentWeek + 1)
                        }
                        title={
                            isLastWeek
                                ? undefined
                                : 'Select next week'
                        }
                    >
                        &#10095;
                    </div>
                </div>
            </caption>

            <thead className={ styles.wrapper }>
            <tr>
                <th/>

                { weekDays.map((day, index) => {
                    return (
                        <Day
                            key={day}
                            day={day}
                            index={index}
                            changeDay={props.changeDay}
                            currentDay={props.course.currentDay}
                        />
                    );
                })}
                </tr>
            </thead>

            <tbody className={ styles.wrapper }>
                {rowList.map((name) => {
                    return (
                        <Row
                            key={name}
                            name={name}
                            data={checkedList[name]}
                            changeChecked={props.changeChecked}
                        />
                    );
                })}
            </tbody>
        </table>
    );
};
