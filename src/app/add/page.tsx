'use client';

import React, { useActionState, useState } from 'react';

import { Week } from '@/app/add/components/Week';
import { FormField } from '@/app/signin/components/FormField';
import { useBackendClient } from '@/providers/BackendClientProvider';
import { Course } from '@/types/Course';
import { getStringFromFormData } from '@/utils/getStringFromFormData';

import styles from './styles.module.css';

function Page() {
    const backendClient = useBackendClient();

    const [baseUrl, setBaseUrl] = useState('');
    const [weeks, setWeeks] = useState<number[]>([]);
    const [nextWeekId, setNextWeekId] = useState(1);
    const [videosCount, setVideosCount] = useState(2);
    const [videoTitleList, setVideoTitleList] = useState<string[]>(Array(2).fill(''));

    const [response, submitAction, isLoading] = useActionState<{
        error: string | null;
        success?: boolean;
        resetKey?: string
    }, FormData>(
        async (previousState, formData) => {
            const courseId = getStringFromFormData(formData, 'courseId');
            const courseName = getStringFromFormData(formData, 'courseName');

            if (!courseId || !courseName) {
                return previousState;
            }

            const courseData: Course = {
                name: courseName,
                currentWeek: 1,
                currentDay: 1,
                id: courseId,
                checkedList: {},
                videoList: {},
            };


            for (let i = 1; i <= weeks.length; i++) {
                const weekKey = `week${i}`;
                courseData.checkedList[weekKey] = {};
                courseData.videoList[weekKey] = {};

                videoTitleList.forEach((title, titleIndex) => {
                    const videoTitle = title === ''
                        ? `Video ${titleIndex + 1}`
                        : title;

                    courseData.checkedList[weekKey][videoTitle] = [];
                });

                for (let j = 1; j <= 7; j++) {
                    courseData.videoList[weekKey][`day${j}`] = [];

                    videoTitleList.forEach((title, titleIndex) => {
                        const videoTitle = title === ''
                            ? `Video ${titleIndex + 1}`
                            : title;

                        const src = getStringFromFormData(formData, `Day ${j} - ${videoTitle}`);
                        if (!src) {
                            return previousState;
                        }
                        const oldValue = courseData.videoList[weekKey][`day${j}`];
                        courseData.videoList[weekKey][`day${j}`] = [...oldValue, {
                            name: title,
                            src,
                        }];
                    });
                }
            }

            try {
                const { error } = await backendClient.updateCourse(courseId, courseData);

                if (error) {
                    return {
                        error: error.message,
                    };
                }
            } catch (e) {
                return {
                    error: e instanceof Error ? e.message : 'The error occurred, try again',
                };
            }

            return {
                error: null,
                success: true,
                resetKey: Date.now().toString(),
            };
        },
        { error: null },
    );

    const handleVideoTitleChange = (value: string, index: number) => {
        setVideoTitleList((prevState) => {
            const newValue = [...prevState];
            newValue.splice(index, 1, value);

            return newValue;
        });
    };

    const handleVideoCountChange = (value: string) => {
        const nextVideosCount = Math.max(0, Number(value) || 0);

        setVideosCount(nextVideosCount);
        setVideoTitleList((prevState) => {
            const newValue = [...prevState];
            newValue.length = nextVideosCount;

            return newValue.fill('', prevState.length);
        });
    };

    const addNewWeek = (e: React.MouseEvent) => {
        e.preventDefault();

        setWeeks((prevState) => [...prevState, nextWeekId]);
        setNextWeekId((prevState) => prevState + 1);
    };

    const removeWeek = (weekId: number) => {
        setWeeks((prevState) => prevState.filter((id) => id !== weekId));
    };

    return (
        <main className={styles.wrapper}>
            <div
                aria-hidden="true"
                className={styles.backgroundPattern}
            />

            <div className={styles.pageGrid}>
                <section className={styles.setupPanel}>
                    <h1 className={styles.header}>
                        Add new course
                    </h1>

                    <FormField
                        name="baseUrl"
                        placeholder="https://example.com/video"
                        label="Base URL for videos"
                        onChange={setBaseUrl}
                    />

                    <FormField
                        name="videosCount"
                        type="number"
                        min="1"
                        defaultValue={videosCount}
                        label="Number of videos per day"
                        onChange={handleVideoCountChange}
                    />

                    { videosCount > 0 &&
                        <div>
                            <label className={styles.label}>
                                <p>Video titles for the single day</p>
                            </label>

                            <div className={ styles.day }>
                                { Array.from({length: videosCount}, (_, index: number) => {
                                    return (
                                        <FormField
                                            key={ index }
                                            name={ `videoTitle${ index + 1 }` }
                                            label={ `Video ${ index + 1 } title` }
                                            onChange={(value) => handleVideoTitleChange(value, index)}
                                        />
                                    );
                                }) }
                            </div>
                        </div>
                    }
                </section>

                <form
                    action={ submitAction }
                    className={styles.weekPanel}
                    key={response?.resetKey}
                >
                    <FormField
                        name="courseId"
                        label="Storage course id"
                    />

                    <FormField
                        name="courseName"
                        placeholder="new course"
                        label="Course name"
                    />

                    <div className={styles.weekList}>
                        { weeks.map((weekId, index) => {
                            return (
                                <Week
                                    key={weekId}
                                    weekNumber={ index + 1 }
                                    videoTitleList={ videoTitleList }
                                    baseUrl={ baseUrl }
                                    onRemove={() => removeWeek(weekId)}
                                />
                            );
                        }) }
                    </div>

                    <div className={styles.actions}>
                        <button
                            className={ styles.addButton }
                            onClick={ addNewWeek }
                            type="button"
                        >
                            + Add new week
                        </button>

                        <button
                            className={ styles.submitButton }
                            disabled={isLoading}
                            type="submit"
                        >
                            { isLoading
                                ? '...Loading'
                                : 'Load data'
                            }
                        </button>
                    </div>
                </form>

                <div className={styles.messageArea}>
                    { response.error && (
                        <div className={ styles.error }>
                            { response.error }
                        </div>
                    ) }

                    { response.success && (
                        <div className={ styles.success }>
                            Course content was successfully loaded.
                        </div>
                    )}
                </div>
            </div>
        </main>
    );
}

export default Page;
