export const checkSocialNetwork = (url: string): boolean => {
    if (!url) return false;

    const socialDomains = [
        'facebook.com',
        'fb.com',
        'instagram.com',
        't.me',
        'twitter.com',
        'x.com',
        'linkedin.com',
        'youtube.com',
        'youtu.be',
        'pinterest.com',
        'vk.com',
        'ok.ru',
        'snapchat.com',
        'threads.net',
        'reddit.com',
        'discord.gg',
        'discord.com',
        'wechat.com',
        'weibo.com',
        'line.me',
        'tiktok.com'
    ];

    try {
        const { hostname } = new URL(url.toLowerCase());
        return socialDomains.some(domain => hostname.includes(domain));
    } catch {
        return false; // invalid URL
    }
}