'use client';

import Link from 'next/link';
import React from 'react';

import styles from './styles.module.css';

type Props = {
    error: Error & { digest?: string };
    reset?: () => void;
}
export const Error = ({ error, reset = () => window.location.reload() }: Props) => {
    return (
        <div className={styles.container}>
            <h2 className={styles.header}>
                Something went wrong :(
            </h2>
            {error.message && (
                <p className={styles.message}>{error.message}</p>
            )}

            <div className={styles.actions}>
                {reset && (
                    <button
                        onClick={() => reset()}
                        className={styles.button}
                    >
                        Try again
                    </button>
                )}
                <Link
                    href="/"
                    className={styles.link}
                >
                    Go to the main page
                </Link>
            </div>
        </div>
    );
};
