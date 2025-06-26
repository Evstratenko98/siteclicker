import {API_KEY, COUNTRIES} from "../constants";

export const searchPlaces = async (textQuery: string, countryKey: keyof typeof COUNTRIES) => {
    const countryInfo = COUNTRIES[countryKey]

    if (!countryInfo) {
        throw new Error(`Неизвестная страна: ${countryKey}`);
    }

    const fullQuery = `${textQuery} ${countryInfo.country}`;

    const url = 'https://places.googleapis.com/v1/places:searchText';

    const headers = {
        'Content-Type': 'application/json',
        'X-Goog-Api-Key': API_KEY,
        'X-Goog-FieldMask': 'places.displayName,places.formattedAddress,places.location,places.websiteUri'
    };

    const body = JSON.stringify({
        textQuery: fullQuery,
        languageCode: countryInfo.languageCode
    });

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers,
            body
        });

        if (!response.ok) {
            throw new Error(`Ошибка: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();
        return data.places || [];
    } catch (error) {
        console.error('Ошибка при запросе к Places API:', error);
        return [];
    }
}
