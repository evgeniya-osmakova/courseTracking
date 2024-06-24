import { getAuth, onAuthStateChanged, User, UserCredential } from 'firebase/auth';
import React, { createContext, useEffect, useState } from 'react';

import { logOut } from '@/firebase/auth/logout';
import { anonymousSignIn, signIn } from '@/firebase/auth/signin';
import firebase_app from '@/firebase/configuration';


const auth = getAuth(firebase_app);

type Context = {
    user: User | null;
    loginUser: (email: string, password: string) =>  Promise<{ result: UserCredential | null, error: unknown }>;
    loginAnonymous: () =>  Promise<{ result: UserCredential | null, error: unknown }>;
    logOutUser: () =>  Promise<{ error: unknown }>;
    loading: boolean;
}

export const AuthContext = createContext<Context | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    const loginUser = async (email: string, password: string) => {
        setLoading(true);

        const result = await signIn(email, password);

        setLoading(false);

        return result;
    };

    const loginAnonymous = async () => {
        setLoading(true);

        const result = await anonymousSignIn();

        setLoading(false);

        return result;
    };

    const logOutUser = async () => {
        setLoading(true);

        const result = await logOut();

        setLoading(false);

        return result;
    };

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            setLoading(false);
        });

        return () => {
            unsubscribe();
        };
    }, []);

    const authValue = {
        user,
        loginUser,
        logOutUser,
        loginAnonymous,
        loading,
    };

    return (
        <AuthContext.Provider value={authValue}>
            {children}
        </AuthContext.Provider>
    );
};
