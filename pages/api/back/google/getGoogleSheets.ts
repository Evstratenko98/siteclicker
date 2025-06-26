import {google} from "googleapis";
import {auth} from "./auth";

export const getGoogleSheets = async () => {
    return google.sheets({version: "v4", auth });
}