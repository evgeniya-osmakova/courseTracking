import React from 'react';

import { FormField } from '@/app/signin/components/FormField';

import styles from './styles.module.css';

type Props = {
    weekNumber: number,
    videoTitleList: string[],
    baseUrl: string,
}

export const Week: React.FC<Props> = (props) => {
    const [isHidden, setIsHidden] = React.useState(false);

    const toggleVisibility = (e: React.MouseEvent) => {
        e.preventDefault();

        setIsHidden(!isHidden);
    };

    return (
        <div className={styles.week}>
            <h3>
                week {props.weekNumber}
            </h3>

            <button
                className={styles.hideButton}
                onClick={toggleVisibility}
            >
                {!isHidden ? 'Hide days' : 'Show days'}
            </button>

            <div className={ isHidden ? styles.hiddenDayList : undefined}>
                {
                    Array.from({ length: 7 }, (_, index: number) => {
                        const dayNumber = index + 1;

                        return (
                            <div
                                key={ index }
                                className={ styles.day }
                            >
                                { props.videoTitleList.map((title, index) => {
                                    const name = `Day ${ dayNumber } - ${ title === ''
                                        ? `Video ${index + 1}`
                                        : title
                                    }`;

                                    return (
                                        <FormField
                                            key={ name + index}
                                            name={ name }
                                            label={ name }
                                            defaultValue={props.baseUrl}
                                            placeholder={ 'https://www.youtube.com' }
                                        />
                                    );
                                }) }
                            </div>
                        );
                    })
                }
            </div>
        </div>
    );
};
