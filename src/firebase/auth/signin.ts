import { signInWithEmailAndPassword, signInAnonymously, getAuth } from 'firebase/auth';

import firebase_app from '@/firebase/configuration';

const auth = getAuth(firebase_app);

export async function signIn(email: string, password: string) {
    let result = null;
    let error = null;

    try {
        result = await signInWithEmailAndPassword(auth, email, password);
    } catch (e) {
        error = e;
    }

    return { result, error };
}

export async function anonymousSignIn() {
    let result = null;
    let error = null;

    try {
        result = await signInAnonymously(auth);
    } catch (e) {
        error = e;
    }

    return { result, error };
}
