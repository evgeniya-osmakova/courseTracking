'use client';

import Link from 'next/link';
import React from 'react';

import { Course } from '@/types/Course';

import styles from './styles.module.css';

type Props = {
    item: Course;
}

export const ListElement: React.FC<Props> = (props) => {
    return (
        <Link
            className={styles.container}
            href={`/${props.item.id}`}
        >
            <div className={styles.name}>
                {props.item.name}
            </div>
        </Link>
    );
};
