import {
    Auth,
    getAuth,
    signInAnonymously,
    signInWithEmailAndPassword,
    signOut,
    UserCredential
} from 'firebase/auth';

import firebase_app from '@/firebase/configuration';
import { AppError } from '@/types/Error';
import { toAppError } from '@/utils/error';

export class AuthenticationAPI {
    constructor() {
        this.auth = getAuth(firebase_app);
    }

    auth: Auth;

    async logOut(): Promise<{ error: AppError | null }> {
        let error: AppError | null = null;

        try {
            await signOut(this.auth);
        } catch (err) {
            error = toAppError(err);
        }

        return { error };
    }

    async signIn(email: string, password: string): Promise<{ result: UserCredential | null, error: AppError | null }> {
        let result: UserCredential | null = null;
        let error: AppError | null = null;

        try {
            result = await signInWithEmailAndPassword(this.auth, email, password);
        } catch (err) {
            error = toAppError(err);
        }

        return { result, error };
    }

    async anonymousSignIn(): Promise<{ result: UserCredential | null, error: AppError | null }> {
        let result: UserCredential | null = null;
        let error: AppError | null = null;

        try {
            result = await signInAnonymously(this.auth);
        } catch (err) {
            error = toAppError(err);
        }

        return { result, error };
    }
}
