'use client';

import { useRouter } from 'next/navigation';

import { Course } from '@/types/Course';

import styles from './styles.module.css';

type Props = {
    item: Course;
}

export const ListElement = (props: Props) => {
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
