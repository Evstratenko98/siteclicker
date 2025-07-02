import {google} from "googleapis";
import {GOOGLE_SCOPES} from "../constants";
import path from "node:path";

export const auth = new google.auth.GoogleAuth({
    keyFile: path.join(process.cwd(), 'siteclicker.json'),
    scopes: GOOGLE_SCOPES,
});
