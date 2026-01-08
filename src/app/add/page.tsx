'use client';

import React, { useActionState, useEffect, useState } from 'react';

import { Week } from '@/app/add/components/Week';
import { FormField } from '@/app/signin/components/FormField';
import { useBackendClient } from '@/providers/BackendClientProvider';
import { Course } from '@/types/Course';
import { getStringFromFormData } from '@/utils/getStringFromFormData';

import styles from './styles.module.css';

function Page() {
    const backendClient = useBackendClient();

    const [baseUrl, setBaseUrl] = useState('');
    const [weekCount, setWeekCount] = useState(0);
    const [videosCount, setVideosCount] = useState(3);
    const [videoTitleList, setVideoTitleList] = useState<string[]>([]);

    useEffect(() => {
        setVideoTitleList((prevState) => {
            const oldLength = prevState.length;
            const newLength = videosCount;

            if (oldLength === newLength) {
                return prevState;
            }

            const newValue = [...prevState];

            if (oldLength < newLength) {
                for (let i = oldLength; i < newLength; i++) {
                    newValue.push('');
                }

                return newValue;
            }

            newValue.length = newLength;

            return newValue;
        });
    }, [videosCount]);

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


            for (let i = 1; i <= weekCount; i++) {
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
        setVideosCount(Number(value));
    };

    const addNewWeek = (e: React.MouseEvent) => {
        e.preventDefault();

        setWeekCount((prevState) => prevState + 1);
    };

    return (
        <main className={styles.wrapper}>
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

            <form
                action={ submitAction }
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

                { Array.from({length: weekCount}, (_, index: number) => {
                    return (
                        <Week
                            key={index}
                            weekNumber={ index + 1 }
                            videoTitleList={ videoTitleList }
                            baseUrl={ baseUrl }
                        />
                    );
                }) }

                <button
                    className={ styles.addButton }
                    onClick={ addNewWeek }
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
            </form>

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
        </main>
    );
}

export default Page;
