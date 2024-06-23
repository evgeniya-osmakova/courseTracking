import { Inter } from 'next/font/google';
import './globals.css';
import React from 'react';

import { Provider } from '@/app/components/Provider/Provider';

const inter = Inter({ subsets: ['latin'] });

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
