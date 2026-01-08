'use client';

import React, { useEffect, useState } from 'react';

import { Error } from '@/components/Error/Error';
import { FAILED_TO_LOAD_DATA } from '@/constants/errors';
import { useBackendClient } from '@/providers/BackendClientProvider';
import { Course } from '@/types/Course';
import { AppError } from '@/types/Error';

import { ListElement } from './ListElement/ListElement';


import styles from './styles.module.css';

export const CourseList = () => {
    const backendClient = useBackendClient();
    const [data, setData] = useState<Course[] | null>([]);
    const [error, setError] = useState<AppError | null>(null);

    useEffect(() => {
        const getData = async () => {
            try {
                const {result, error} = await backendClient.getCourseList();

                setData(result);
                setError(error);
            } catch (e) {
                setError({ message: FAILED_TO_LOAD_DATA, originalError: e });
            }
        };

        getData();
    }, [backendClient]);

    if (!data || error) {
        return (
            <Error error={ error || {
                name: 'dataLoadingError',
                message: FAILED_TO_LOAD_DATA
            } as any }/>
        );
    }

    return (
        <div className={ styles.listWrapper }>
            {
                data.map((item) => {
                    return (
                        <ListElement
                            item={ item }
                            key={ item.id }
                        />
                    );
                })
            }
        </div>
    );
};
