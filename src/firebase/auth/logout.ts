import { signOut, getAuth } from 'firebase/auth';

import firebase_app from '../configuration';

const auth = getAuth(firebase_app);

export async function logOut() {
    let error = null;

    try {
        await signOut(auth);
    } catch (e) {
        error = e;
    }

    return { error };
}
