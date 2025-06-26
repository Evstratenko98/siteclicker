import {google} from "googleapis";
import {GOOGLE_SCOPES, JSON_FILE_WITH_KEYS} from "../constants";
import path from "node:path";

export const auth = new google.auth.GoogleAuth({
    keyFile: path.join(process.cwd(), JSON_FILE_WITH_KEYS),
    scopes: GOOGLE_SCOPES,
});
