export enum Status {
    SUITABLE = 'SUITABLE',
    RECOMMENDED = 'RECOMMENDED',
    UNSUITABLE = 'UNSUITABLE',
}

export type GooglePlace = {
    displayName: {
        text: string;
        languageCode: string;
    };
    formattedAddress: string;
    websiteUri: string;
    location: string;
}

export type GoogleResponse = {
    places: GooglePlace[];
    nextPageToken: string;
}

export type LogPlace = {
    displayName: {
        text: string;
        languageCode: string;
    };
    formattedAddress: string;
    isWebsiteUri: boolean;
    websiteUri: string;
    isError: boolean;
    error: string;
    isLanding: boolean;
    isSocialNetwork: boolean;
    siteDetails: unknown;
    isExistsInCheckList: boolean,
    status: Status;
}

export type GetSitesResponse = {
    logPlaces: LogPlace[];
    nextPageToken: string;
}