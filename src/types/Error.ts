export interface AppError {
    message: string;
    code?: string;
    originalError?: unknown;
}
