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
            message: error.message,
            originalError: error,
        };
    }

    if (typeof error === 'string') {
        return {
            message: error,
        };
    }

    return {
        message: 'An unknown error occurred',
        originalError: error,
    };
}
