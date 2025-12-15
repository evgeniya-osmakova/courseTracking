'use client';

import Link from 'next/link';
import React from 'react';

import { useAuthenticationContext } from '@/providers/AuthenticationProvider';
import { useBackendClient } from '@/providers/BackendClientProvider';

import styles from './styles.module.css';

export const SingInOutButton = () => {
    const { user } = useAuthenticationContext();
    const backendClient = useBackendClient();

    const signOut = async () => {
        try {
            await backendClient.authentication.logOut();
        } catch {

        }
    };

    if (user) {
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
