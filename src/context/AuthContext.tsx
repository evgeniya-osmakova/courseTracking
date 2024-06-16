'use client';

import { User } from '@firebase/auth-types';
import {
    onAuthStateChanged,
    getAuth,
} from 'firebase/auth';
import React from 'react';

import firebase_app from '@/firebase/configuration';


const auth = getAuth(firebase_app);

export const AuthContext = React.createContext<{user: User | null}>({ user: null });

export const useAuthContext = () => React.useContext(AuthContext);

export const AuthContextProvider = (
    { children }: {children:  React.ReactNode}
) => {
    const [user, setUser] = React.useState<User | null>(null);
    const [loading, setLoading] = React.useState(true);

    React.useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (userData) => {
            if (userData) {
                // @ts-ignore
                setUser(userData);
            } else {
                setUser(null);
            }

            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    return (
        <AuthContext.Provider value={{ user }}>
            {loading ? <div>Loading...</div> : children}
        </AuthContext.Provider>
    );
};
