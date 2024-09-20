'use client';

import Image from 'next/image';
import { usePathname } from 'next/navigation';
import React from 'react';

import { SingInOutButton } from '@/app/components/Header/components/SingInOutButton';
import userIcon from '@/images/user.svg';
import { useAuthenticationContext } from '@/providers/AuthenticationProvider';

import styles from './styles.module.css';

export const Header: React.FC = () => {
    const { user } = useAuthenticationContext();

    const pathname = usePathname();

    return (
        <header className={styles.header}>
            {pathname !== '/signin' && (
               <SingInOutButton />
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
                    alt="Follow us on Twitter"
                />
            </div>
        </header>
    );
};
