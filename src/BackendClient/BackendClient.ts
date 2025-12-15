import { AuthenticationAPI } from '@/firebase/auth';
import { FirestoreAPI } from '@/firebase/firestore';
import { Course, CourseListSchema, CourseSchema } from '@/types/Course';

export class BackendClient {
    constructor() {
        this.authentication = new AuthenticationAPI();

        this.firestore = new FirestoreAPI();
    }

    authentication: AuthenticationAPI;

    private firestore: FirestoreAPI;

    async getCourseData(id: string): Promise<{ result: Course | null, error: unknown }> {
        const { result, error } = await this.firestore.getData(id);

        if (error) {
            return { result: null, error };
        }

        if (!result || Array.isArray(result)) {
            return { result: null, error: null };
        }

        const candidate = {
            id,
            ...result,
        };

        const parsed = CourseSchema.safeParse(candidate);

        if (!parsed.success) {
            return { result: null, error: parsed.error };
        }

        return { result: parsed.data, error: null };
    }

    async getCourseList(): Promise<{ result: Course[] | null, error: unknown }> {
        const { result, error } = await this.firestore.getData();

        if (error) {
            return { result: null, error };
        }

        if (!result || !Array.isArray(result)) {
            return { result: null, error: null };
        }

        const parsed = CourseListSchema.safeParse(result);

        if (!parsed.success) {
            return { result: null, error: parsed.error };
        }

        return { result: parsed.data, error: null };
    }

    async updateCourse(id: string, data: Partial<Course>): Promise<{result: boolean, error: unknown}> {
        return this.firestore.addData(id, data);
    }
}
