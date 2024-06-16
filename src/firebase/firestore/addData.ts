import { getFirestore, doc, setDoc } from 'firebase/firestore';

import firebase_app from '../configuration';

const db = getFirestore(firebase_app);

async function addData(collection: string, id: string, data: any) {
    let result = null;
    let error = null;

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
    return addData('videos', id, data);
}
