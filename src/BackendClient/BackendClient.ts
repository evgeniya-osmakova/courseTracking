import { AuthenticationAPI } from '@/firebase/auth';
import { FirestoreAPI } from '@/firebase/firestore';
import { Course } from '@/types/Course';

export class BackendClient {
    constructor() {
        this.authentication = new AuthenticationAPI();

        this.firestore = new FirestoreAPI();
    }

    authentication: AuthenticationAPI;

    private firestore: FirestoreAPI;

    async getCourseData(id: string): Promise<{ result: Course | null, error: unknown }> {
        return this.firestore.getData(id);
    }

    async getCourseList(): Promise<{ result: Course[] | null, error: unknown }> {
        return await this.firestore.getData();
    }

    async updateCourse(id: string, data: any): Promise<{result: boolean, error: unknown}> {
        return this.firestore.addData(id, data);
    }
}
