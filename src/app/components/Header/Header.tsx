'use client';



import { User } from '@firebase/auth-types';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';

import { logOut } from '@/firebase/auth/logout';
import userIcon from '@/images/user.svg';

import styles from './styles.module.css';

type Props = {
    user: User | null;
}

export const Header: React.FC<Props> = (props) => {
    const pathname = usePathname();

    const signOut = async () => {
        const { error } = await logOut();

        if (!error) {
            window.location.href = '/signin';
        }
    };

    return (
        <header className={styles.header}>
            {pathname !== '/signin' && (
                <>
                    {
                        props.user && (
                            <button
                                className={ styles.action }
                                onClick={ signOut }
                            >
                                Sign out
                            </button>
                        )
                    }

                    {
                        !props.user && (
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
                        props.user
                            ? props.user.email
                            : 'Anonymous'
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
