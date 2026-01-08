'use client';

import React from 'react';

import { Error } from '@/components/Error/Error';
import { Spinner } from '@/components/Spinner/Spinner';
import { useCourses } from '@/hooks/useCourses';

import { ListElement } from './ListElement/ListElement';


import styles from './styles.module.css';

export const CourseList = () => {
    const { data, error, isLoading } = useCourses();

    if (error) {
        return (
            <Error error={ error }/>
        );
    }

    if (isLoading) {
        return (
            <div className={ styles.listWrapper }>
                <Spinner />
            </div>
        );
    }

    if (!data || data.length === 0) {
        return (
            <div className={ styles.listWrapper }>
                No courses found.
            </div>
        );
    }

    return (
        <div className={ styles.listWrapper }>
            {
                data.map((item) => (
                    <ListElement
                        item={ item }
                        key={ item.id }
                    />
                ))
            }
        </div>
    );
};
