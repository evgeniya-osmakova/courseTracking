import type { Auth } from 'firebase/auth';

export const getCollectionName = (auth: Auth) => {
    return auth.currentUser?.isAnonymous
        ? process.env.NEXT_PUBLIC_FIREBASE_COLLECTION_ANONYMOUS as string
        : process.env.NEXT_PUBLIC_FIREBASE_COLLECTION as string;
};
