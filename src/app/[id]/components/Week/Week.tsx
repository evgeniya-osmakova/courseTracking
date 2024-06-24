'use client';

import classNames from 'classnames';

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

    return (
        <table className={styles.container}>
            <caption className={ styles.caption }>
                <div className={ styles.navigation }>
                    <div
                        className={
                            isFirstWeek
                                ? classNames(styles.arrow, styles.inactiveArrow)
                                : styles.arrow
                        }
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
                        className={
                            isLastWeek
                                ? classNames(styles.arrow, styles.inactiveArrow)
                                : styles.arrow
                        }
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
                            <th
                                key={ day }
                                className={
                                    props.course.currentDay === index + 1
                                        ? classNames(styles.day, styles.currentDay)
                                        : styles.day
                                }
                                onClick={
                                    props.course.currentDay === index + 1
                                        ? undefined
                                        : () => props.changeDay(index + 1)
                                }
                                title={'Change selected day'}
                            >
                                { day }
                            </th>
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
