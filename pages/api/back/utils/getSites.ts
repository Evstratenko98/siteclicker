import {searchPlaces} from "./searchPlaces";
import {checkIfLandingPage} from "./checkIfLandingPage";
import {formatUrl} from "./formatUrl";
import {getExistingSites} from "../google/getExistingSites";
import {COUNTRIES} from "../constants";
import {GetSitesResponse, LogPlace, Status} from "../types/places";
import {checkSocialNetwork} from "./checkSocialNetwork";

export const getSites = async (
    params: {
        text: string,
        countryTitle: keyof typeof COUNTRIES
        nextPageToken?: string;
    }
): Promise<GetSitesResponse | null> => {
    const {text, countryTitle} = params;
    const existingSites = await getExistingSites();
    const googleResponse = await searchPlaces(text, countryTitle);

    if(!googleResponse) {
        return null;
    }

    const logPlaces: LogPlace[] = await Promise.all(
        googleResponse.places.map(async (place) => {
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
            };

            if (logPlace.isWebsiteUri) {
                try {
                    const result = await checkIfLandingPage(place.websiteUri);
                    if (result.error) {
                        logPlace.isError = true;
                        logPlace.error = `Ошибка: ${result.message}`;
                    } else {
                        logPlace.isLanding = result.isLanding;
                        logPlace.siteDetails = {...result.details};
                    }
                } catch (e) {
                    logPlace.isError = true;
                    logPlace.error = `Ошибка при проверке: ${e}`;
                }

                logPlace.isSocialNetwork = checkSocialNetwork(logPlace.websiteUri);

                if (!logPlace.isLanding) {
                    const website = formatUrl(place.websiteUri);
                    logPlace.isExistsInCheckList = existingSites.includes(website);
                }

                if (
                    !logPlace.isLanding &&
                    !logPlace.isExistsInCheckList &&
                    !logPlace.isError &&
                    !logPlace.isSocialNetwork
                ) {
                    logPlace.status = Status.SUITABLE;
                }
            }

            return logPlace;
        })
    );

    return {
        logPlaces,
        nextPageToken: googleResponse?.nextPageToken || '',
    };
}