import { AppError } from '@/types/Error';

function isAppError(error: any): error is AppError {
    return error && typeof error.message === 'string';
}

export function toAppError(error: unknown): AppError {
    if (isAppError(error)) {
        return error;
    }

    if (error instanceof Error) {
        return {
            name: error.name,
            message: error.message,
            code: 'code' in error ? String(error.code) : undefined,
            originalError: error,
        };
    }

    if (typeof error === 'string') {
        return {
            name: 'Error',
            message: error,
        };
    }

    return {
        name: 'Error',
        message: 'An unknown error occurred',
        originalError: error,
    };
}
