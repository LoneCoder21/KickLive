import { REST, Routes, Client, GatewayIntentBits, Events, BaseInteraction } from "discord.js";
import "dotenv/config";
import { help, list, watch, unwatch, sample, reset } from "./commands/utility.js";

const client_id = process.env.clientid;
const discord_token = process.env.token;
const guildId = "586280213680357386";

export async function loadSlashCommands() {
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

export async function createClient() {
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
            case "reset":
                reset.execute(interaction);
                break;
        }
    });

    return client;
}
