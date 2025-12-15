import { DocumentData, type Firestore } from '@firebase/firestore'
import {
    type Auth,
    getAuth,
} from 'firebase/auth';
import {
    collection,
    doc,
    getDoc,
    getDocs,
    getFirestore,
    setDoc
} from 'firebase/firestore';

import firebase_app from '@/firebase/configuration';
import { Course } from '@/types/Course'

export class FirestoreAPI {
    constructor() {
        this.auth = getAuth(firebase_app);
        this.db = getFirestore(firebase_app);
    }

    auth: Auth;
    db: Firestore;

    async addData(id: string, data: Partial<Course>) {
        let result = false;
        let error = null;

        if (!this.auth) {
            return { result, error };
        }

        const collection = this.getCollectionName(this.auth);

        try {
            await setDoc(doc(this.db, collection, id), data, {
                merge: true,
            });

            result = true;
        } catch (e) {
            error = e;
        }

        return { result, error };
    }

    async getData(id?: string): Promise<{ result: DocumentData | DocumentData[] | null, error: unknown }> {
        let result: DocumentData | null = null;
        let error = null;

        if (!this.auth) {
            return { result, error };
        }

        const collectionName = this.getCollectionName(this.auth);

        try {
            if (id) {
                result = await this.getCollection(id, collectionName);
            } else {
                result = await this.getCollectionList(collectionName);
            }
        } catch (e) {
            error = e;
        }

        return { result, error };
    }

    private getCollectionName = (auth: Auth) => {
        return auth.currentUser?.isAnonymous
            ? process.env.NEXT_PUBLIC_FIREBASE_COLLECTION_ANONYMOUS as string
            : process.env.NEXT_PUBLIC_FIREBASE_COLLECTION as string;
    };

    private async getCollectionList(collectionName: string): Promise<DocumentData[]> {
        const querySnapshot = await getDocs(collection(this.db, collectionName));

        return querySnapshot.docs.map((doc) => ({
            ...doc.data(),
            id: doc.id,
        }));
    };

    private async getCollection(id: string, collectionName: string): Promise<DocumentData | null> {
        const docRef = doc(this.db, collectionName, id);

        const documentSnapshot = await getDoc(docRef);

        return  documentSnapshot.data() ?? null;
    };
}
