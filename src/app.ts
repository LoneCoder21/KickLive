import Pusher from "pusher-js";
import axios from "axios";
import "dotenv/config";
import { Livestream } from "./Livestream.js";
import { REST, Routes, Client, GatewayIntentBits, Events, BaseInteraction } from "discord.js";
import { headers } from "./constants/headers.js";

import { help, list, watch, unwatch, sample } from "./commands/utility.js";

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

const discord_token = process.env.token;
const client_id = process.env.clientid;
const channelId = "1205701785365512282";
const guildId = "586280213680357386";

async function createClient() {
    const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages] });

    await client.login(discord_token);
    await client.once("ready", () => {});

    client.on(Events.InteractionCreate, (interaction: BaseInteraction) => {
        if (!interaction.isChatInputCommand()) return;
        switch (interaction.commandName) {
            case "watch":
                watch.execute(interaction);
                break;
            case "unwatch":
                unwatch.execute(interaction);
                break;
            case "list":
                list.execute(interaction);
                break;
            case "help":
                help.execute(interaction);
                break;
            case "sample":
                sample.execute(interaction);
                break;
        }
    });

    return client;
}

const client = await createClient();

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

const rest = new REST().setToken(discord_token);

(async () => {
    try {
        const data = await rest.put(Routes.applicationGuildCommands(client_id, guildId), {
            body: [
                help.command_string,
                list.command_string,
                watch.command_string,
                unwatch.command_string,
                sample.command_string
            ]
        });

        console.log(`Successfully reloaded ${data.length} application (/) commands.`);
    } catch (error) {
        console.error(error);
    }
})();
