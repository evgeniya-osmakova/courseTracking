import Link from 'next/link';
import React, { useContext } from 'react';

import { AuthContext } from '@/AuthProvider';

import styles from './styles.module.css';

export const SingInOutButton = () => {
    const context = useContext(AuthContext);

    const signOut = async () => {
        if (!context) {
            return;
        }

        const { error } = await context.logOutUser();

        if (!error) {
            window.location.href = '/signin';
        }
    };

    if (context?.user) {
        return (
            <button
                className={ styles.action }
                onClick={ signOut }
            >
                Sign out
            </button>
        );
    }

    return (
        <Link
            className={ styles.action }
            href="/signin"
        >
            Sign In
        </Link>
    );
};
