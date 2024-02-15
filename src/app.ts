import Pusher from "pusher-js";
import axios from "axios";
import "dotenv/config";
import { Livestream } from "./Livestream.js";

import { HEADERS } from "./constants/headers.js";
import { getToken } from "./auth/token.js";
import { loadSlashCommands, createClient } from "./discord.js";

import { STREAMER_URL, CHATROOM_V2_URL } from "./constants/url.js";

async function getChatRoomId(name: string): number | undefined {
    const token = getToken(name);

    try {
        const res = await axios.get(CHATROOM_V2_URL(name), {
            headers: { ...HEADERS, Authorization: `Bearer ${token}` }
        });
        return res.data.id;
    } catch (err) {
        console.error(err);
    }

    return undefined;
}

async function setupPusher(name: string) {
    //const id = await getChatRoomId(name);
    // const pusher = new Pusher("eb1d5f283081a78b932c", {
    //     cluster: "us2"
    // });
    //const channel = pusher.subscribe(`chatrooms.${id}.v2`);
    // pusher.connection.bind("error", function (err) {
    //     console.log(err);
    // });
    // channel.bind("App\\Events\\StreamerIsLive", (data: Livestream) => {
    //     if (!client.isReady) return;
    //     discord_channel.send(`${name} - live right now at https://kick.com/${name} - ${data.session_title}`);
    // });
}

setupPusher("destiny");

loadSlashCommands();
createClient();
