import React from 'react';

import { Error } from './components/Error/Error';
import { ListElement } from './components/ListElement/ListElement';
import { getCourseList } from '@/firebase/firestore/getData';

import styles from './page.module.css';

async function getData() {
    return await getCourseList();
}

export default async function Home() {
    const { result: data, error } = await getData();

    if (!data || error) {
        return (
            <main className={ styles.main }>
                <Error error={ {
                    name: 'dataLoadingError',
                    message: 'failed to load the data'
                } }/>
            </main>
        );
    }

    return (
        <main className={ styles.main }>
            <div className={styles.listWrapper}>
                {
                    data.map((item) => {
                        return(
                            <ListElement
                                item={item}
                                key={item.id}
                            />
                        );
                    })
                }
            </div>
        </main>
    );
};
