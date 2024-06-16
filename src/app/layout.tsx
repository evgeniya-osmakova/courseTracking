'use client';

import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { Inter } from 'next/font/google';
import './globals.css';
import { useRouter } from 'next/navigation';
import React from 'react';

import firebase_app from '@/firebase/configuration';

const inter = Inter({ subsets: ['latin'] });

const auth = getAuth(firebase_app);

export default function RootLayout({
    children,
}: Readonly<{ children: React.ReactNode }>) {
    // const [isUserValid, setIsUserValid] = useState(false);

    const router = useRouter();

    React.useEffect(() => {
        const checkAuth = () => {
            onAuthStateChanged(auth, (userData) => {
                if (!userData) {
                    router.push('/signin');
                }
            });
        };

        return () => checkAuth();
    }, [router]);

    // React.useEffect(() => {
    //     if (!isUserValid) {
    //         router.push('/signin');
    //     } else {
    //         router.push('/');
    //     }
    // }, [isUserValid, router]);

    return (
        <html lang="en">
            <body className={inter.className}>
                {children}
            </body>
        </html>
    );
}
