export interface AppError extends Error {
    message: string;
    code?: string;
    originalError?: unknown;
}
