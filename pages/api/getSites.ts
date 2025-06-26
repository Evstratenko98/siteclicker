import type { NextApiRequest, NextApiResponse } from 'next';
import {getSites} from "./back/utils/getSites";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Метод не разрешён' });
    }

    const { text, sheetId, checkListName, fillListName, countryTitle } = req.body;

    if (!text || !sheetId || !checkListName || !fillListName || !countryTitle) {
        return res.status(400).json({ error: 'Не все поля заполнены' });
    }

    // Возвращаем успешный ответ
    getSites({ text, sheetId, checkListName, fillListName, countryTitle })
    return res.status(200).json({ message: 'Данные успешно получены' });
}