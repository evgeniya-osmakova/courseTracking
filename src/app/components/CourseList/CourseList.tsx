import React, { useContext, useEffect, useState } from 'react';

import { Error } from '@/app/components/Error/Error';
import { ListElement } from '@/app/components/ListElement/ListElement';
import { AuthContext } from '@/AuthProvider';
import { getCourseList } from '@/firebase/firestore/getData';
import { Course } from '@/types/Course';

import styles from './styles.module.css';

export const CourseList = () => {
    const [data, setData] = useState<Course[] | null>([]);
    const [error, setError] = useState(false);

    const context = useContext(AuthContext);

    useEffect(() => {
        if (!context || context.loading) {
            return;
        }

        const getData = async () => {
            try {
                const {result, error: error} = await getCourseList();

                setData(result);

                if (error) {
                    setError(true);
                }
            } catch (err: unknown) {
                setError(true);
            }
        };

        getData();
    }, [context]);

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
