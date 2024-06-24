'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React, { useContext } from 'react';

import { AuthContext } from '@/AuthProvider';
import userIcon from '@/images/user.svg';

import styles from './styles.module.css';

export const Header: React.FC = () => {
    const context = useContext(AuthContext);

    const pathname = usePathname();

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
        <header className={styles.header}>
            {pathname !== '/signin' && (
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
            )}

            <div className={styles.user}>
                <div className={styles.name}>
                    {
                        context?.user?.isAnonymous
                            ? 'Anonymous'
                            : context?.user?.email
                    }
                </div>

                <Image
                    className={styles.icon}
                    src={userIcon}
                    alt="Follow us on Twitter"
                />
            </div>
        </header>
    );
};
