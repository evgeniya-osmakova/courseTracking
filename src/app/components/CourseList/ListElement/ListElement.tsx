'use client';

import Link from 'next/link';

import type { CourseListItem } from '@/types/Course';

import styles from './styles.module.css';

type Props = {
    item: CourseListItem;
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
