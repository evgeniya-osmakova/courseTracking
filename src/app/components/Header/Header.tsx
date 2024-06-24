'use client';

import Image from 'next/image';
import { usePathname } from 'next/navigation';
import React, { useContext } from 'react';

import { SingInOutButton } from '@/app/components/Header/components/SingInOutButton';
import { AuthContext } from '@/AuthProvider';
import userIcon from '@/images/user.svg';

import styles from './styles.module.css';

export const Header: React.FC = () => {
    const context = useContext(AuthContext);

    const pathname = usePathname();

    return (
        <header className={styles.header}>
            {pathname !== '/signin' && (
               <SingInOutButton />
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
