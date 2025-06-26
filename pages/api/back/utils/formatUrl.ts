export const formatUrl = (url: string) => {
    let cleaned = url.replace(/^https?:\/\//, '');
    cleaned = cleaned.replace(/\/$/, '');
    cleaned = cleaned.replace(/^www\./, '');
    return cleaned;
}