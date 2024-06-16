'use client';

import { useRouter } from 'next/navigation';

import { ListItem } from '@/types/ListItem';

import styles from './styles.module.css';

type Props = {
    item: ListItem;
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
