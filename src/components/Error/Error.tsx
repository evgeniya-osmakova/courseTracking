'use client';

import React from 'react';
import Link from 'next/link';

import styles from './styles.module.css';

type Props = {
    error: Error & { digest?: string }
}
export const Error: React.FC<Props> = ({ error }) => {
    return (
        <div className={styles.container}>
            <h2 className={styles.header}>
                { `Something went wrong :(

                ${ error.message && (
                    error.message
                ) }` }
            </h2>

            <Link
                href="/"
                className={styles.link}
            >
                Go to the main page
            </Link>
        </div>
    );
};
