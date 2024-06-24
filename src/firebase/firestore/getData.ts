import { getAuth } from 'firebase/auth';
import { getFirestore, doc, getDoc, getDocs, collection } from 'firebase/firestore';

import firebase_app from '../configuration';
import { Course } from '@/types/Course';

const db = getFirestore(firebase_app);
const auth = getAuth(firebase_app);

async function getData(id?: string): Promise<{ result: any, error: unknown }> {
    let result = null;
    let error = null;

    if (!auth) {
        return { result, error };
    }

    const collectionName =
        auth.currentUser?.isAnonymous
            ? process.env.NEXT_PUBLIC_FIREBASE_COLLECTION_ANONYMOUS as string
            : process.env.NEXT_PUBLIC_FIREBASE_COLLECTION as string;

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
