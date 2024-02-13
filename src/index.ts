import Pusher from "pusher-js";
import axios from "axios";
import "dotenv/config";
import { Livestream } from "./Livestream.js";
import { Client, GatewayIntentBits } from "discord.js";

const useragent =
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36 Edg/121.0.0.0";

const headers = {
    "User-Agent": useragent,
    Accept: "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7",
    "Accept-Encoding": "gzip, deflate, br",
    "Accept-Language": "en-US,en;q=0.9",
    "Sec-Ch-Ua": `"Not A(Brand";v="99", "Microsoft Edge";v="121", "Chromium";v="121"`,
    "Sec-Ch-Ua-Platform": `Windows`,
    "Sec-Fetch-Dest": "document",
    "Sec-Fetch-Mode": "navigate",
    "Sec-Fetch-Site": "none",
    "Sec-Fetch-User": "?1",
    "Upgrade-Insecure-Requests": "1"
};

async function getToken(name: string): string | undefined {
    try {
        const res = await axios.get(`https://kick.com/${name}`, {
            headers: headers
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

async function getChatRoomId(name: string): number | undefined {
    const token = getToken(name);

    try {
        const res = await axios.get(`https://kick.com/api/v2/channels/${name}/chatroom`, {
            headers: { ...headers, Authorization: `Bearer ${token}` }
        });
        return res.data.id;
    } catch (err) {
        console.error(err);
    }

    return undefined;
}

const token = process.env.token;
const channelId = "1205701785365512282";

async function setupPusher(name: string) {
    const id = await getChatRoomId(name);
    const pusher = new Pusher("eb1d5f283081a78b932c", {
        cluster: "us2"
    });

    const channel = pusher.subscribe(`chatrooms.${id}.v2`);

    pusher.connection.bind("error", function (err) {
        console.log(err);
    });

    const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages] });

    await client.login(token);

    await client.once("ready", () => {});

    const discord_channel = await client.channels.cache.get(channelId);

    channel.bind("App\\Events\\StreamerIsLive", (data: Livestream) => {
        if (!client.isReady) return;
        discord_channel.send(`${name} - live right now at https://kick.com/${name} - ${data.session_title}`);
    });
}

setupPusher("destiny");
