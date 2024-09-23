'use client';

import React, { useEffect, useState } from 'react';

import { Error } from '@/components/Error/Error';
import { ListElement } from './ListElement/ListElement';
import { useBackendClient } from '@/providers/BackendClientProvider';
import { Course } from '@/types/Course';


import styles from './styles.module.css';

export const CourseList = () => {
    const backendClient = useBackendClient();
    const [data, setData] = useState<Course[] | null>([]);
    const [error, setError] = useState(false);

    useEffect(() => {
        const getData = async () => {
            try {
                const {result, error: error} = await backendClient.getCourseList();

                setData(result);

                if (error) {
                    setError(true);
                }
            } catch (err: unknown) {
                setError(true);
            }
        };

        getData();
    }, [backendClient]);

    if (!data || error) {
        return (
            <Error error={ {
                name: 'dataLoadingError',
                message: 'Failed to load the data. Please try again later'
            } }/>
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
