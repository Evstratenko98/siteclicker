import axios from "axios";
import * as cheerio from 'cheerio';

export const checkIfLandingPage = async (siteUrl: string) => {
    try {
        const { data: html } = await axios.get(siteUrl, {
            headers: { 'User-Agent': 'Mozilla/5.0' }
        });

        const $ = cheerio.load(html);

        // Признак 1: Количество ссылок
        const linkCount = $('a').length;

        // Признак 2: Количество секций или больших блоков
        const sectionCount = $('section').length + $('div[class*="section"]').length;

        // Признак 3: Есть ли якоря (#) в href (характерно для навигации по странице)
        const hashLinks = $('a[href^="#"]').length;

        // Признак 4: Tilda, Wix, Webflow и др.
        const htmlLower = html.toLowerCase();
        const builtWith = [
            htmlLower.includes('tilda'),
            htmlLower.includes('wix'),
            htmlLower.includes('webflow'),
            htmlLower.includes('bitrix24'),
            htmlLower.includes('lpgenerator')
        ].some(Boolean);

        const isLanding = (
            (sectionCount <= 5 && linkCount <= 15 && hashLinks >= 1) || builtWith
        );

        return {
            isLanding,
            details: {
                linkCount,
                sectionCount,
                hashLinks,
                builtWith
            }
        };

    } catch (error: unknown) {
        console.error(`Ошибка при проверке сайта: ${siteUrl}`, JSON.stringify(error));
        return {
            isLanding: false,
            error: true,
            message: JSON.stringify(error)
        };
    }
}
