import React, { createContext, useContext, useMemo } from 'react';

import { BackendClient } from '@/BackendClient/BackendClient';

const BackendClientContext = createContext<BackendClient | null>(null);

export const BackendClientProvider = ({ children }: { children: React.ReactNode }) => {
    const backendClient = useMemo(() => new BackendClient(), []);

    return (
        <BackendClientContext.Provider value={backendClient}>
            {children}
        </BackendClientContext.Provider>
    );
};

export const useBackendClient = () => {
    const context = useContext(BackendClientContext);

    if (!context) {
        throw new Error('useBackendClient must be used within BackendClientProvider');
    }

    return context;
};
