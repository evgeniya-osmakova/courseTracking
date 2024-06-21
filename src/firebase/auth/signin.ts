import { signInWithEmailAndPassword, getAuth } from 'firebase/auth';

import firebase_app from '../configuration';

const auth = getAuth(firebase_app);

export async function signIn(email: string, password: string) {
    let result = null,
        error = null;
    try {
        result = await signInWithEmailAndPassword(auth, email, password);
    } catch (e) {
        error = e;
    }

    return { result, error };
}