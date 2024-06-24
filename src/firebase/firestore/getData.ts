import { getAuth } from 'firebase/auth';
import { getFirestore, doc, getDoc, getDocs, collection } from 'firebase/firestore';

import firebase_app from '../configuration';
import { getCollectionName } from '@/firebase/firestore/getCollectionName';
import { Course } from '@/types/Course';

const db = getFirestore(firebase_app);
const auth = getAuth(firebase_app);

const getCollectionList = async (collectionName: string) => {
    const querySnapshot = await getDocs(collection(db, collectionName));
    return querySnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
    }));
};

const getCollection = async (id: string, collectionName: string) => {
    const docRef = doc(db, collectionName, id);
    const documentSnapshot = await getDoc(docRef);
    return  documentSnapshot.data() ?? null;
};

async function getData(id?: string): Promise<{ result: any, error: unknown }> {
    let result = null;
    let error = null;

    if (!auth) {
        return { result, error };
    }

    const collectionName = getCollectionName(auth);

    try {
        if (id) {
            result = await getCollection(id, collectionName);
        } else {
            result = await getCollectionList(collectionName);
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
