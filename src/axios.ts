import axios from "axios";
import { HEADERS } from "./constants/headers.js";

export const GET = async (url: string) => {
    return axios.get(url, {
        headers: HEADERS,
        proxy: {
            protocol: "http",
            host: "geo.iproyal.com",
            port: 11250,
            auth: {
                username: "wKOq7OMRkolH1Eo1",
                password: "CJ223ZvSYOCwiIag_country-us"
            }
        }
    });
};
