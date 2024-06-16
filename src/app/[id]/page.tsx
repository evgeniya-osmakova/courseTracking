import React from 'react';

import { Video } from '@/app/[id]/components/Video/Video';
import { Week } from '@/app/[id]/components/Week/Week';
import { updateCourse } from '@/firebase/firestore/addData';
import { getCourseData } from '@/firebase/firestore/getData';

import styles from './page.module.css';

type Params = {
    id: string;
}

async function getData(params: Params) {
    return await getCourseData(params.id);
}

export default async function Course({ params }: { params: Params }) {
    const { result: course, error } = await getData(params);

    if (!course || error) {
        return (
            <div>
                error
            </div>
        );
    }

    const changeDay = async (day: number) => {
        'use server';

        const newData = {
            ...course,
            currentDay: day,
        };

        await updateCourse(params.id, newData);
    };

    const changeWeek = async (week: number) => {
        'use server';

        const weeksCount = Object.keys(course.videoList).length;

        if (week < 1 || week > weeksCount) {
            return;
        }

        const newData = {
            ...course,
            currentWeek: week,
        };

        await updateCourse(params.id, newData);
    };

    const changeChecked = async (checked: boolean, activityType: string, index: number) => {
        'use server';

        const oldData = course.checkedList[course.currentWeek][activityType];

        let newData = [];

        if (checked) {
            newData = [...oldData, index];
        } else {
            const indexToDelete = oldData.findIndex((item) => item === index);
            newData = [...oldData];
            newData.splice(indexToDelete, 1);
        }


        const newValue = {
            ...course,
            checkedList: {
                ...course.checkedList,
                [course.currentWeek]: {
                    ...course.checkedList[course.currentWeek],
                    [activityType]: newData,
                }
            }
        };

        await updateCourse(params.id, newData);
    };

    return (
        <div className={styles.container}>
            <Week
                number={course.currentWeek}
                checkedList={course.checkedList[`week${course.currentWeek}`]}
                changeDay={changeDay}
                changeWeek={changeWeek}
                changeChecked={changeChecked}
            />

            {
                course.videoList[`week${course.currentWeek}`]?.[`day${course.currentWeek}`]?.map((item) => {
                    console.log(item.src);
                    return (
                        <Video
                            key={item.src}
                            src={item.src}
                            name={item.name}
                        />
                    );
                })
            }
        </div>
    );
}
