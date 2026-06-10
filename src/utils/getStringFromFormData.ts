export function getStringFromFormData(formData: FormData, key: string): string | undefined {
    const value = formData.get(key);

    return typeof value === 'string' ? value : undefined;
}
