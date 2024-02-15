import axios from "axios";
import "dotenv/config";
import { HEADERS } from "../constants/headers.js";
import { STREAMER_URL } from "../constants/url.js";

export async function getToken(name: string): string | undefined {
    try {
        const res = await axios.get(STREAMER_URL(name), {
            headers: HEADERS
        });

        for (const f of res.headers["set-cookie"]) {
            if (f.startsWith("XSRF-TOKEN")) {
                const tokenwithparams = f.split("=")[1];
                const encodedtoken = tokenwithparams.split(";")[0];
                const decodedtoken = decodeURIComponent(encodedtoken);
                return decodedtoken;
            }
        }
    } catch (err) {
        console.error(err);
    }

    return undefined;
}
