import React from 'react';

import { CourseList } from './components/CourseList/CourseList';

import styles from './page.module.css';

export default function Home() {
    return (
        <main className={ styles.main }>
            <div
                aria-hidden="true"
                className={styles.backgroundPattern}
            />

            <section className={styles.panel}>
                <div className={styles.header}>
                    <h1 className={styles.title}>
                      Course list
                    </h1>
                </div>

                <CourseList />
            </section>
        </main>
    );
};
