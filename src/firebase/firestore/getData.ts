import { getFirestore, doc, getDoc, getDocs, collection } from 'firebase/firestore';

import firebase_app from '../configuration';
import { Course } from '@/types/Course';

const db = getFirestore(firebase_app);

async function getData(collectionName: string, id?: string): Promise<{ result: any, error: unknown }> {
    let result = null;
    let error = null;

    try {
        if (id) {
            const docRef = doc(db, collectionName, id);
            const documentSnapshot = await getDoc(docRef);
            result = documentSnapshot.data() ?? null;
        } else {
            const querySnapshot = await getDocs(collection(db, collectionName));
            result = querySnapshot.docs.map((doc) => ({
                ...doc.data(),
                id: doc.id,
            }));
        }
    } catch (e) {
        error = e;
    }

    return { result, error };
}

export async function getCourseData(id: string): Promise<{ result: Course | null, error: unknown }> {
    return getData('videos', id);
}

export async function getCourseList(): Promise<{ result: Course[] | null, error: unknown }> {
    return await getData('videos');
}
