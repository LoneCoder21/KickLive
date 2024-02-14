import { SlashCommandBuilder } from "discord.js";

export function execute(interaction: ChatInputCommandInteraction) {
    interaction.reply("Unwatch!");
}

export const command_string = new SlashCommandBuilder()
    .setName("unwatch")
    .setDescription("Stop watching the streamer for live events")
    .toJSON();
