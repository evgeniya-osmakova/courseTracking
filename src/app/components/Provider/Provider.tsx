'use client';

import React from 'react';

import { Header } from '../Header/Header';
import { AuthenticationProvider } from '@/providers/AuthenticationProvider';
import { BackendClientProvider } from '@/providers/BackendClientProvider';

export const Provider: React.FC<React.PropsWithChildren> = ({ children }) => {
    return (
        <AuthenticationProvider>
            <BackendClientProvider>
                <Header />

                {children}
            </BackendClientProvider>
        </AuthenticationProvider>
    );
};
