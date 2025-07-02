import {CountryInfo} from "./types/places";

export const GOOGLE_SCOPES = ['https://www.googleapis.com/auth/spreadsheets'];

export const COUNTRIES: Record<string, CountryInfo> = {
    POLAND:        { title: 'Poland',        languageCode: 'pl', regionCode: 'PL', country: 'Poland' },
    FRANCE:        { title: 'France',        languageCode: 'fr', regionCode: 'FR', country: 'France' },
    ITALY:         { title: 'Italy',         languageCode: 'it', regionCode: 'IT', country: 'Italy' },
    DENMARK:       { title: 'Denmark',       languageCode: 'da', regionCode: 'DK', country: 'Denmark' },
    UNITED_KINGDOM:{ title: 'United Kingdom',languageCode: 'en', regionCode: 'GB', country: 'United Kingdom' },
    BULGARIA:      { title: 'Bulgaria',      languageCode: 'bg', regionCode: 'BG', country: 'Bulgaria' },
    NETHERLANDS:   { title: 'Netherlands',   languageCode: 'nl', regionCode: 'NL', country: 'Netherlands' },
    SWEDEN:        { title: 'Sweden',        languageCode: 'sv', regionCode: 'SE', country: 'Sweden' },
    SPAIN:         { title: 'Spain',         languageCode: 'es', regionCode: 'ES', country: 'Spain' },
    CZECHIA:       { title: 'Czechia',       languageCode: 'cs', regionCode: 'CZ', country: 'Czechia' },
    SWITZERLAND:   { title: 'Switzerland',   languageCode: 'de', regionCode: 'CH', country: 'Switzerland' },
    AUSTRIA:       { title: 'Austria',       languageCode: 'de', regionCode: 'AT', country: 'Austria' },
    AZERBAIJAN:    { title: 'Azerbaijan',    languageCode: 'az', regionCode: 'AZ', country: 'Azerbaijan' },
    GERMANY:       { title: 'Germany',       languageCode: 'de', regionCode: 'DE', country: 'Germany' },
    FINLAND:       { title: 'Finland',       languageCode: 'fi', regionCode: 'FI', country: 'Finland' },
    SLOVENIA:      { title: 'Slovenia',      languageCode: 'sl', regionCode: 'SI', country: 'Slovenia' },
    TURKEY:        { title: 'Turkey',        languageCode: 'tr', regionCode: 'TR', country: 'Turkey' },
    SLOVAKIA:      { title: 'Slovakia',      languageCode: 'sk', regionCode: 'SK', country: 'Slovakia' },
    PORTUGAL:      { title: 'Portugal',      languageCode: 'pt', regionCode: 'PT', country: 'Portugal' },
    IRELAND:       { title: 'Ireland',       languageCode: 'en', regionCode: 'IE', country: 'Ireland' },
    BELGIUM:       { title: 'Belgium',       languageCode: 'nl', regionCode: 'BE', country: 'Belgium' },
    ESTONIA:       { title: 'Estonia',       languageCode: 'et', regionCode: 'EE', country: 'Estonia' },
    NORWAY:        { title: 'Norway',        languageCode: 'no', regionCode: 'NO', country: 'Norway' },
};