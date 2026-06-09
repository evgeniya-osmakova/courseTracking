'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';

import { SingInOutButton } from '@/app/components/Header/SingInOutButton/SingInOutButton';
import userIcon from '@/images/user.svg';
import { useAuthenticationContext } from '@/providers/AuthenticationProvider';

import styles from './styles.module.css';

export const Header = () => {
    const { user } = useAuthenticationContext();

    const pathname = usePathname();

    if (pathname === '/signin') {
        return null;
    }

    return (
        <header className={styles.header}>
            <Link
                className={styles.brand}
                href="/"
            >
                <span className={styles.brandMark}>
                    CT
                </span>

                <span>
                    Course Tracking
                </span>
            </Link>

            <nav className={styles.nav}>
                {user && pathname !== '/add' && (
                    <Link
                        className={styles.link}
                        href="/add"
                    >
                        Add new course
                    </Link>
                )}

                {user && pathname !== '/' && (
                    <Link
                        className={styles.link}
                        href="/"
                    >
                        Course list
                    </Link>
                )}
            </nav>

            <div className={styles.account}>
                <SingInOutButton />

                {user && (
                    <div className={styles.user}>
                        <div className={styles.name}>
                            {
                                user.isAnonymous
                                    ? 'Anonymous'
                                    : user.email
                            }
                        </div>

                        <Image
                            className={styles.icon}
                            src={userIcon}
                            alt="User icon"
                        />
                    </div>
                )}
            </div>
        </header>
    );
};
