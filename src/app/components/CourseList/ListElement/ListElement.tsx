'use client';

import Link from 'next/link';

import { Course } from '@/types/Course';

import styles from './styles.module.css';

type Props = {
    item: Course;
}

export const ListElement = ({ item }: Props) => {
    return (
        <Link
            className={styles.container}
            href={`/${item.id}`}
        >
            <div className={styles.name}>
                {item.name}
            </div>
        </Link>
    );
};
