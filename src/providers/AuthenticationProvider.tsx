import { getAuth, onAuthStateChanged, User } from 'firebase/auth';
import { usePathname, useRouter } from 'next/navigation';
import React, {
    createContext,
    useContext,
    useEffect,
    useState
} from 'react';

import { Loading } from '@/components/Loading/Loading';
import firebase_app from '@/firebase/configuration';

const auth = getAuth(firebase_app);

type Context = {
    user: User | null;
}

export const AuthenticationContext = createContext<Context | null>(null);

export const AuthenticationProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    const router = useRouter();
    const pathname = usePathname();

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            setLoading(false);
        });

        return () => {
            unsubscribe();
        };
    }, []);

    useEffect(() => {
        if (!user && pathname !== '/signin') {
            router.push('/signin');
        }

        if (user && pathname === '/signin') {
            router.push('/');
        }
    }, [router, user, pathname]);

    if (loading) {
        return <Loading />;
    }

    return (
        <AuthenticationContext.Provider value={{user}}>
            {children}
        </AuthenticationContext.Provider>
    );
};

export function useAuthenticationContext(): Context {
    const context = useContext(AuthenticationContext);

    if (!context) {
        throw new Error('useBackendClient must be used within BackendClientProvider');
    }

    return context;
}
