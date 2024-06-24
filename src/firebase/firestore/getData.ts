import { getFirestore, doc, getDoc, getDocs, collection } from 'firebase/firestore';

import firebase_app from '../configuration';
import { Course } from '@/types/Course';
import { getAuth } from 'firebase/auth'

const db = getFirestore(firebase_app);
const auth = getAuth(firebase_app);

async function getData(id?: string): Promise<{ result: any, error: unknown }> {
    let result = null;
    let error = null;

    const collectionName =
        auth.currentUser?.isAnonymous
            ? 'videos2'
            : 'videos'

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
    return getData(id);
}

export async function getCourseList(): Promise<{ result: Course[] | null, error: unknown }> {
    return await getData();
}
