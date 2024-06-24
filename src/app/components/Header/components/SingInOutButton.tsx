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

    return (
        <>
            {
                context?.user && (
                    <button
                        className={ styles.action }
                        onClick={ signOut }
                    >
                        Sign out
                    </button>
                )
            }

            {
                !context?.user && (
                    <Link
                        className={ styles.action }
                        href="/signin"
                    >
                        Sign In
                    </Link>
                )
            }
        </>
    );
};
