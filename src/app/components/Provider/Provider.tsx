'use client';

import React from 'react';

import { AuthenticationProvider } from '@/providers/AuthenticationProvider';
import { BackendClientProvider } from '@/providers/BackendClientProvider';

import { Header } from '../Header/Header';

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
