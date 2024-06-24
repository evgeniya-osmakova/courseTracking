'use client';

import { Day } from '@/app/[id]/components/Week/Day';
import { Row } from '@/app/[id]/components/Week/Row';
import { WeekArrow } from '@/app/[id]/components/Week/WeekArrow';
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
    const weeksCount =Object.keys(props.course.videoList).length;

    return (
        <table className={styles.container}>
            <caption className={ styles.caption }>
                <div className={ styles.navigation }>
                    <WeekArrow
                        arrowType="previous"
                        currentWeek={props.course.currentWeek}
                        changeWeek={props.changeWeek}
                        weeksCount={weeksCount}
                    />

                    Week { props.course.currentWeek }

                    <WeekArrow
                        arrowType="next"
                        currentWeek={props.course.currentWeek}
                        changeWeek={props.changeWeek}
                        weeksCount={weeksCount}
                    />
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
