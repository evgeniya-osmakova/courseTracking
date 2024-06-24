import { getFirestore, doc, setDoc } from 'firebase/firestore';

import firebase_app from '../configuration';
import { getAuth } from 'firebase/auth'

const db = getFirestore(firebase_app);
const auth = getAuth(firebase_app);

async function addData(id: string, data: any) {
    let result = null;
    let error = null;

    const collection =
        auth.currentUser?.isAnonymous
            ? 'videos2'
            : 'videos'

    try {
        result = await setDoc(doc(db, collection, id), data, {
            merge: true,
        });
    } catch (e) {
        error = e;
    }

    return { result, error };
}

export async function updateCourse(id: string, data: any) {
    return addData(id, data);
}
