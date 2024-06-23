'use client';

import React from 'react';

import { Header } from '@/app/components/Header/Header';
import { AuthProvider } from '@/AuthProvider';

export const Provider: React.FC<React.PropsWithChildren> = ({ children }) => {
    return (
        <AuthProvider>
            <Header />

            {children}
        </AuthProvider>
    );
};
