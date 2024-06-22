'use client';

import { User } from '@firebase/auth-types';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { Inter } from 'next/font/google';
import './globals.css';
import {  usePathname, useRouter } from 'next/navigation';
import React from 'react';

import { Header } from '@/app/components/Header/Header';
import { Loading } from '@/app/components/Loading/Loading';
import firebase_app from '@/firebase/configuration';

const inter = Inter({ subsets: ['latin'] });

const auth = getAuth(firebase_app);

export default function RootLayout({
    children,
}: Readonly<{ children: React.ReactNode }>) {
    const [user, setUser] = React.useState<User | null>(null);
    const [loading, setLoading] = React.useState(true);

    const router = useRouter();
    const pathname = usePathname();

    React.useLayoutEffect(() => {
        console.log('1');
        const checkAuth = () => {
            console.log('2');
            onAuthStateChanged(auth, (userData) => {
                console.log(userData);

                if (userData && pathname === '/signin') {
                    router.push('/');
                }

                if (!userData && pathname !== '/signin') {
                    router.push('/signin');
                }

                setUser(userData as any);

                setLoading(false);
            });
        };
        checkAuth();

        return () => checkAuth();
    }, [router, pathname]);

    if (loading) {
        return (
            <html lang="en">
                <body className={inter.className}>
                    <Loading />
                </body>
            </html>
        );
    }

    return (
        <html lang="en">
            <body className={inter.className}>
                <Header user={user} />

                {children}
            </body>
        </html>
    );
}
