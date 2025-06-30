import {searchPlaces} from "./searchPlaces";
import {checkIfLandingPage} from "./checkIfLandingPage";
import {formatUrl} from "./formatUrl";
import {getExistingSites} from "../google/getExistingSites";
import {COUNTRIES} from "../constants";
import {GetSitesResponse, LogPlace, Status} from "../types/places";

export const getSites = async (
    params: {
        text: string,
        sheetId: string,
        checkListName: string,
        countryTitle: keyof typeof COUNTRIES
        nextPageToken?: string;
    }
): Promise<GetSitesResponse | null> => {
    const {text, sheetId, checkListName, countryTitle} = params;
    const existingSites = await getExistingSites(sheetId, checkListName);
    const googleResponse = await searchPlaces(text, countryTitle);
    const logPlaces: LogPlace[] = [];

    if(!googleResponse) {
        return null;
    }

    for(const place of googleResponse.places) {
        const logPlace: LogPlace = {
            displayName: place.displayName,
            formattedAddress: place.formattedAddress,
            isWebsiteUri: !!place.websiteUri,
            websiteUri: place.websiteUri,
            isError: false,
            error: '',
            isLanding: false,
            isSocialNetwork: false,
            siteDetails: {},
            isExistsInCheckList: false,
            status: Status.UNSUITABLE,
        }

        if (logPlace.isWebsiteUri) {
            await checkIfLandingPage(place.websiteUri).then(result => {
                if (result.error) {
                    logPlace.isError = true;
                    logPlace.error = `Ошибка: ${result.message}`;
                } else {
                    logPlace.isLanding = result.isLanding;
                    logPlace.siteDetails = {...result.details};
                }
            });
        }
        if(logPlace.isWebsiteUri && !logPlace.isLanding) {
            const website = formatUrl(place.websiteUri);
            logPlace.isExistsInCheckList = existingSites.includes(website);
        }
        if(logPlace.isWebsiteUri && !logPlace.isLanding && !logPlace.isExistsInCheckList && !logPlace.isError && !logPlace.isSocialNetwork) {
            logPlace.status = Status.SUITABLE;
        }

        logPlaces.push(logPlace);
    }

    return {
        logPlaces,
        nextPageToken: googleResponse?.nextPageToken || '',
    };
}