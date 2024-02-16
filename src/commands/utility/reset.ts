import { SlashCommandBuilder, ChatInputCommandInteraction } from "discord.js";
import { getDatabase } from "../../db/db.js";

export async function execute(interaction: ChatInputCommandInteraction) {
    const table = await getDatabase();

    await table.destroy({
        truncate: true
    });

    interaction.reply("Removed all streamers from this channel! 😊");
}

export const command_string = new SlashCommandBuilder()
    .setName("reset")
    .setDescription("Reset the streamer list to nothing")
    .toJSON();
