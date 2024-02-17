import { REST, Routes } from "discord.js";
import "dotenv/config";
import { help, list, watch, unwatch, sample, reset } from "./commands/utility.js";

const client_id = process.env.clientid;
const discord_token = process.env.discordtoken;
const guildId = "586280213680357386";

export async function registerSlashCommands() {
    const rest = new REST().setToken(discord_token);

    try {
        const data = await rest.put(Routes.applicationGuildCommands(client_id, guildId), {
            body: [
                help.command_string,
                list.command_string,
                watch.command_string,
                unwatch.command_string,
                sample.command_string,
                reset.command_string
            ]
        });

        console.log(`Successfully reloaded ${data.length} application (/) commands.`);
    } catch (error) {
        console.error(error);
    }
}