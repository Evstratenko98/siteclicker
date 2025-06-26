import {getGoogleSheets} from "./getGoogleSheets";

export const addWebsiteInSheet = async (
    params: {
        website: string,
        sheetId: string,
        fillListName: string
    }) => {
    const {website, sheetId, fillListName} = params;
    const sheets = await getGoogleSheets();

    const getResponse = await sheets.spreadsheets.values.get({
        spreadsheetId: sheetId,
        range: `${fillListName}!B:B`,
    });

    const rows = getResponse.data.values || [];
    const firstEmptyRowIndex = rows.length + 1; // +1 потому что индексация в Google Sheets начинается с 1

    await sheets.spreadsheets.values.update({
        spreadsheetId: sheetId,
        range: `${fillListName}!B${firstEmptyRowIndex}`,
        valueInputOption: 'RAW',
        requestBody: {
            values: [[website]],
        },
    });

    return true;
}
