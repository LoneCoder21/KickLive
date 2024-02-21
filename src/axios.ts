import axios from "axios";
import { HEADERS } from "./constants/headers.js";

export const GET = async (url: string) => {
    return axios.get(url, {
        headers: HEADERS
    });
};
