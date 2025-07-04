export type GetSitesApiRequestDto = {
    text: string;
    countryTitle: string;
    nextPageToken: string;
}

export enum FrontStatus {
    SUITABLE = 'SUITABLE',
    RECOMMENDED = 'RECOMMENDED',
    UNSUITABLE = 'UNSUITABLE',
}


export type FrontGetSitesResponse = {
    logPlaces: FrontLogPlace[];
    nextPageToken: string;
}

export type FrontLogPlace = {
    displayName: {
        text: string;
        languageCode: string;
    };
    formattedAddress: string;
    isWebsiteUri: boolean;
    websiteUri: string;
    formatWebsiteUri?: string;
    isError: boolean;
    error: string;
    isLanding: boolean;
    isSocialNetwork: boolean;
    siteDetails: unknown;
    isExistsInCheckList: boolean,
    status: FrontStatus;
}