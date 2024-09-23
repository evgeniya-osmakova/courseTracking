'use client';

import { useRouter } from 'next/navigation';
import React from 'react';

import { Course } from '@/types/Course';

import styles from './styles.module.css';

type Props = {
    item: Course;
}

export const ListElement: React.FC<Props> = (props) => {
    const router = useRouter();

    return (
        <div
            className={styles.container}
            onClick={() => router.push(`/${props.item.id}`)}
        >
            <div className={styles.name}>
                {props.item.name}
            </div>
        </div>
    );
};
