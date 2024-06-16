'use client';

import { Row } from '@/app/[id]/components/Week/Row';
import { CheckedDays } from '@/types/Week';

import styles from './styles.module.css';

type Props = {
    number: number;
    checkedList: CheckedDays;
    changeWeek: (index: number) => void;
    changeDay: (index: number) => void;
    changeChecked: (checked: boolean, activityType: string, index: number) => void;
}

const weekDays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sa', 'Sun'];

export const Week = (props: Props) => {
    const rowList = Object.keys(props.checkedList);

    return (
        <table className={styles.container}>
            <caption className={ styles.caption }>
                <div className={ styles.navigation }>
                    <div
                        className={ styles.arrow }
                        onClick={() => props.changeWeek(props.number - 1)}
                    >
                        &#10094;
                    </div>

                    Week { props.number }

                    <div
                        className={ styles.arrow }
                        onClick={() => props.changeWeek(props.number + 1)}
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
                                className={styles.day}
                                onClick={() => props.changeDay(index)}
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
                            data={props.checkedList[name]}
                            changeChecked={props.changeChecked}
                        />
                    );
                })}
            </tbody>
        </table>
    );
};
