export const GITHUB_URL = "https://github.com/LoneCoder21/KickLive";
export const PROFILE_PIC_URL =
    "https://dbxmjjzl5pc1g.cloudfront.net/6a985671-90ef-4d3f-a249-4451800dc6a1/Kick-Favicon152x152.png";
export const DOMAIN_URL = "https://kick.com";
export const STREAMER_URL = (streamer: string) => {
    return `${DOMAIN_URL}/${streamer}`;
};
export const API_V2_URL = (streamer: string) => {
    return `${DOMAIN_URL}/api/v2/channels/${streamer}`;
};
