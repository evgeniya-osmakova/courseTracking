import { useEffect, useState } from 'react';

import { useBackendClient } from '@/providers/BackendClientProvider';
import { Course } from '@/types/Course';
import { AppError } from '@/types/Error';
import { toAppError } from '@/utils/error';

export const useCourses = () => {
    const backendClient = useBackendClient();
    const [data, setData] = useState<Course[] | null>(null);
    const [error, setError] = useState<AppError | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        let isMounted = true;

        const getData = async () => {
            setIsLoading(true);
            setError(null);
            try {
                const { result, error } = await backendClient.getCourseList();

                if (!isMounted) {
                    return;
                }

                if (error) {
                    setError(error);
                } else {
                    setData(result || []);
                }
            } catch (e) {
                if (!isMounted) {
                    return;
                }

                setError(toAppError(e));
            } finally {
                if (isMounted) {
                    setIsLoading(false);
                }
            }
        };

        getData();

        return () => {
            isMounted = false;
        };
    }, [backendClient]);

    return {
        data,
        error,
        isLoading
    };
};
