import { getAuth, onAuthStateChanged, User, UserCredential } from 'firebase/auth';
import { usePathname, useRouter } from 'next/navigation';
import React, { createContext, useEffect, useState } from 'react';

import { logOut } from '@/firebase/auth/logout';
import { signIn } from '@/firebase/auth/signin';
import firebase_app from '@/firebase/configuration';


const auth = getAuth(firebase_app);

type Context = {
    user: User | null;
    loginUser: (email: string, password: string) =>  Promise<{ result: UserCredential | null, error: unknown }>;
    logOutUser: () =>  Promise<{ error: unknown }>;
    loading: boolean;
}

export const AuthContext = createContext<Context | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    const router = useRouter();
    const pathname = usePathname();

    const loginUser = (email: string, password: string) => {
        setLoading(true);

        return signIn(email, password);
    };

    const logOutUser = () => {
        setLoading(true);

        return logOut();
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
        loading,
    };

    return (
        <AuthContext.Provider value={authValue}>
            {children}
        </AuthContext.Provider>
    );
};
