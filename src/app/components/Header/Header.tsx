'use client';

import Image from 'next/image';
import { usePathname } from 'next/navigation';
import React from 'react';

import { SingInOutButton } from '@/app/components/Header/SingInOutButton/SingInOutButton';
import userIcon from '@/images/user.svg';
import { useAuthenticationContext } from '@/providers/AuthenticationProvider';

import styles from './styles.module.css';
import Link from 'next/link'

export const Header: React.FC = () => {
    const { user } = useAuthenticationContext();

    const pathname = usePathname();

    return (
        <header className={styles.header}>
            {pathname !== '/signin' && (
               <SingInOutButton />
            )}

            {user && pathname !== '/add' && (
                <div className={styles.link}>
                    <Link href="/add">Add new course</Link>
                </div>
            )}

            {user && pathname !== '/' && (
                <div className={styles.link}>
                    <Link href="/">Course list</Link>
                </div>
            )}

            <div className={styles.user}>
                <div className={styles.name}>
                    {
                        user?.isAnonymous
                            ? 'Anonymous'
                            : user?.email
                    }
                </div>

                <Image
                    className={styles.icon}
                    src={userIcon}
                    alt="User icon"
                />
            </div>
        </header>
    );
};
