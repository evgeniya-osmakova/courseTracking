import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import React from 'react';
import './globals.css';

import { Provider } from './components/Provider/Provider';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
    icons: {
        icon: '/icon.svg',
        shortcut: '/icon.svg',
    },
};

export default function RootLayout({
    children,
}: Readonly<{ children: React.ReactNode }>) {
    return (
        <html lang="en">
            <body className={inter.className}>
                <Provider>
                    {children}
                </Provider>
            </body>
        </html>
    );
}
