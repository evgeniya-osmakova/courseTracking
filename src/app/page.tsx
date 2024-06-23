'use client';

import { useRouter } from 'next/navigation';
import React, { useContext, useEffect } from 'react';

import { CourseList } from '@/app/components/CourseList/CourseList';
import { Loading } from '@/app/components/Loading/Loading';
import { AuthContext } from '@/AuthProvider';

import styles from './page.module.css';

export default function Home() {
    const context = useContext(AuthContext);

    const router = useRouter();

    useEffect(() => {
        if (!context?.user && !context?.loading) {
            router.push('/signin');
        }
    }, [router, context]);

    if (!context || context.loading) {
        return (
            <Loading />
        );
    }

    return (
        <main className={ styles.main }>
            <CourseList />
        </main>
    );
};
