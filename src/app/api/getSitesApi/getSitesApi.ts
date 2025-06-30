import {FrontGetSitesResponse, GetSitesApiRequestDto} from "@/app/api/getSitesApi/getSitesApi.types";

export const getSitesApi = async (body: GetSitesApiRequestDto): Promise<FrontGetSitesResponse | null> => {
    try {
        const res =  await fetch('/api/getSites', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body),
        });
        return res.json();
    } catch {
        return null;
    }
}