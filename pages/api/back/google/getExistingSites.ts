import {getGoogleSheets} from "./getGoogleSheets";

export const getExistingSites = async (): Promise<string[]> => {
    const sheetId = process.env.SHEET_ID;
    const checkListName = process.env.CHECK_LIST_TITLE;
    if(!sheetId || !checkListName) {
        return [];
    }

    const sheets = await getGoogleSheets();

    const rows = ['!A:A', '!B:B', '!C:C', '!D:D'];
    const existingSites: string[] = [];

    for(const row of rows) {
        const readRes = await sheets.spreadsheets.values.get({
            spreadsheetId: sheetId,
            range: `${checkListName}${row}`,
        });

        const values = readRes.data.values || [];
        existingSites.push(...values.flat().filter(Boolean));
    }

    return existingSites;
}
