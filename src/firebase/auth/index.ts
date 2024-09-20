import {
    Auth,
    getAuth,
    signInAnonymously,
    signInWithEmailAndPassword,
    signOut
} from 'firebase/auth';

import firebase_app from '@/firebase/configuration';

export class AuthenticationAPI {
    constructor() {
        this.auth = getAuth(firebase_app);
    }

    auth: Auth;

    async logOut() {
        let error = null;

        try {
            await signOut(this.auth);
        } catch (err) {
            error = err;
        }

        return { error };
    }

    async signIn(email: string, password: string) {
        let result = null;
        let error = null;

        try {
            result = await signInWithEmailAndPassword(this.auth, email, password);
        } catch (err) {
            error = err;
        }

        return { result, error };
    }

    async anonymousSignIn() {
        let result = null;
        let error = null;

        try {
            result = await signInAnonymously(this.auth);
        } catch (err) {
            error = err;
        }

        return { result, error };
    }
}
