'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useContext, useEffect, useState } from 'react';

import { Video } from '@/app/[id]/components/Video/Video';
import { Week } from '@/app/[id]/components/Week/Week';
import { Error } from '@/app/components/Error/Error';
import { Loading } from '@/app/components/Loading/Loading';
import { AuthContext } from '@/AuthProvider';
import { updateCourse } from '@/firebase/firestore/addData';
import { getCourseData } from '@/firebase/firestore/getData';
import type { Course } from '@/types/Course';
import { WeekDay } from '@/types/Week';

import styles from './styles.module.css';

type Params = {
    id: string;
}

export default function Course({ params }: { params: Params }) {
    const [course, setCourse] = useState<Course | null>(null);
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(true);

    const context = useContext(AuthContext);

    const router = useRouter();

    useEffect(() => {
        if (!context?.user && !context?.loading) {
            router.push('/signin');
        }
    }, [router, context]);

    useEffect(() => {
        if (!context || context.loading) {
            return;
        }

        setLoading(true);

        const getData = async () => {
            try {
                const { result, error } = await getCourseData(params.id);

                setCourse(result);
                setError(!!error);
            } catch (err) {
                setError(true);
            }

            setLoading(false);
        };

        getData();
    }, [params.id, context]);

    if (context?.loading || loading) {
        return (
            <Loading />
        );
    }

    if (!course || error) {
        return (
            <main>
                <Error error={ {
                    name: 'dataLoadingError',
                    message: 'Failed to load the data. Please try again later'
                } }/>
            </main>
        );
    }

    const changeDay = async (day: number) => {
        const newData = {
            ...course,
            currentDay: day,
        };

        const { error } = await updateCourse(params.id, newData);

        setError(!!error);

        if (!error) {
            setCourse(newData);
        }
    };

    const changeWeek = async (week: number) => {
        const weeksCount = Object.keys(course.videoList).length;

        if (week < 1 || week > weeksCount) {
            return;
        }

        const newData = {
            ...course,
            currentWeek: week,
            currentDay: 1,
        };

        const { error } = await updateCourse(params.id, newData);

        setError(!!error);

        if (!error) {
            setCourse(newData);
        }
    };

    const changeChecked = async (checked: boolean, activityType: string, index: number) => {
        const checkedList = course.checkedList[`week${course.currentWeek}`];

        const oldData = checkedList[activityType];

        let newData: WeekDay[];

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
                [`week${course.currentWeek}`]: {
                    ...checkedList,
                    [activityType]: newData,
                }
            }
        };

        const { error } = await updateCourse(params.id, newValue);

        setError(!!error);

        if (!error) {
            setCourse(newValue);
        }
    };

    return (
        <main className={styles.container}>
            <Link
                href='/'
                className={styles.link}
                title={'To the home page'}
            >
                &#10094; Back
            </Link>

            <Week
                course={course}
                changeDay={changeDay}
                changeWeek={changeWeek}
                changeChecked={changeChecked}
            />

            <section className={styles.videoList}>
                {
                    course.videoList[`week${course.currentWeek}`]?.[`day${course.currentDay}`]?.map((item) => {
                        return (
                            <Video
                                key={item.src}
                                src={item.src}
                                name={item.name}
                            />
                        );
                    })
                }
            </section>
        </main>
    );
}
