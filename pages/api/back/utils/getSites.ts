import {searchPlaces} from "./searchPlaces";
import {checkIfLandingPage} from "./checkIfLandingPage";
import {formatUrl} from "./formatUrl";
import {getExistingSites} from "../google/getExistingSites";
import {addWebsiteInSheet} from "../google/addWebsiteInSheet";
import {COUNTRIES} from "../constants";

export const getSites = async (
    params: {
        text: string,
        sheetId: string,
        checkListName: string,
        fillListName: string,
        countryTitle: keyof typeof COUNTRIES
    }
) => {
    const {text, sheetId, checkListName, fillListName, countryTitle} = params;
    const existingSites = await getExistingSites(sheetId, checkListName);
    const places = await searchPlaces(text, countryTitle);
    for(const place of places) {
        const logPlace = {
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
            isAddedInSheet: false,
        }

        if (place.websiteUri) {
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
        if(place.websiteUri && !place.isLanding) {
            const website = formatUrl(place.websiteUri);
            logPlace.isExistsInCheckList = existingSites.includes(website)

            if(!logPlace.isExistsInCheckList) {
                await addWebsiteInSheet({ website, sheetId, fillListName })
                    .then(() => logPlace.isAddedInSheet = true)
                    .catch(() => logPlace.isAddedInSheet = false);
            }
        }

        console.log(logPlace);
    }
}