import Pusher from "pusher-js";
import axios from "axios";
import { HEADERS } from "./constants/headers.js";
import { Livestream } from "./Livestream.js";
import { getDiscordClient } from "./discord.js";
import { API_V2_URL } from "./constants/url.js";

const watchstreamers = new Set<string>();
const pusher = new Pusher("eb1d5f283081a78b932c", {
    cluster: "us2"
});

export async function subscribePusher(name: string) {
    if (watchstreamers.has(name)) return;
    watchstreamers.add(name);

    const res = await axios.get(API_V2_URL(name), {
        headers: HEADERS
    });
    console.log(res.data);
    const id = res.data.id;
    const followers_count = res.data.followers_count;
    //const thumbnail = res.data.livestream.thumbnail.url;
    //const title = res.data.livestream.session_title;
    const categories = res.data.recent_categories;

    const channel = pusher.subscribe(`channel.${id}`);
    pusher.connection.bind("error", function (err) {
        console.log(err);
    });
    channel.bind("App\\Events\\StreamerIsLive", (data: Livestream) => {
        const client = getDiscordClient();
        const discord_channel = client.channels.cache.get();

        if (!client.isReady) return;

        discord_channel.send(`${name} - live right now at https://kick.com/${name} - ${data.session_title}`);
    });
}
