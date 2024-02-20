import { Client, GatewayIntentBits, Events, BaseInteraction } from "discord.js";
import dotenv from "dotenv";
import { help, list, watch, unwatch, sample, reset } from "./commands/utility.js";
import { subscribePusher } from "./pusher.js";
import { getDatabase } from "./db/db.js";

dotenv.config();
const discord_token = process.env.discordtoken;
console.log(discord_token);

const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages] });

await client.login(discord_token);

export async function setupDiscordEvents() {
    await client.once("ready", async () => {
        const table = await getDatabase();

        const streamers = await table.findAll();
        const list = streamers.map((streamer) => streamer.streamer);

        for (const name of list) {
            subscribePusher(name);
        }
    });

    await client.on(Events.InteractionCreate, (interaction: BaseInteraction) => {
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
            case "reset":
                reset.execute(interaction);
                break;
        }
    });
}

export async function getDiscordClient() {
    return client;
}
