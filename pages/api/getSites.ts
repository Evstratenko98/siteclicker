import type { NextApiRequest, NextApiResponse } from 'next';
import {getSites} from "./back/utils/getSites";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Метод не разрешён' });
    }

    const { text, countryTitle, nextPageToken } = req.body;

    if (!text || !countryTitle) {
        return res.status(400).json({ error: 'Не все поля заполнены' });
    }

    const result = await getSites({ text, countryTitle, nextPageToken })
    return res.status(200).json(result);
}