import {COUNTRIES} from "../constants";
import {GoogleResponse} from "../types/places";

export const searchPlaces = async (textQuery: string, countryKey: keyof typeof COUNTRIES, nextPageToken?: string): Promise<GoogleResponse | null> => {
    const countryInfo = COUNTRIES[countryKey]

    if (!countryInfo) {
        throw new Error(`Неизвестная страна: ${countryKey}`);
    }

    const fullQuery = `${textQuery} ${countryInfo.country}`;

    const url = 'https://places.googleapis.com/v1/places:searchText';

    const headers = {
        'Content-Type': 'application/json',
        'X-Goog-Api-Key': process.env.GOOGLE_API_KEY || '',
        'X-Goog-FieldMask': '*'
        // 'X-Goog-FieldMask': 'places.displayName,places.formattedAddress,places.location,places.websiteUri'
    };

    const body: {
        languageCode: string;
        pageSize: number;
        textQuery?: string;
        nextPageToken?: string;
    } = {
        languageCode: countryInfo.languageCode,
        pageSize: 5,
    };

    if(nextPageToken) {
        body.nextPageToken = nextPageToken;
    } else {
        body.textQuery = fullQuery;
    }

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers,
            body: JSON.stringify(body),
        });

        return await response.json();
    } catch (error) {
        console.error('Ошибка при запросе к Places API:', error);
        return null;
    }
}
