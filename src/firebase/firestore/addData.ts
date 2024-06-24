import { getAuth } from 'firebase/auth';
import { getFirestore, doc, setDoc } from 'firebase/firestore';

import firebase_app from '../configuration';
import { getCollectionName } from '@/firebase/firestore/getCollectionName';

const db = getFirestore(firebase_app);
const auth = getAuth(firebase_app);

async function addData(id: string, data: any) {
    let result = null;
    let error = null;

    if (!auth) {
        return { result, error };
    }

    const collection = getCollectionName(auth);

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
