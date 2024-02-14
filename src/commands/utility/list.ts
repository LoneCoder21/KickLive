import { SlashCommandBuilder } from "discord.js";

export function execute(interaction: ChatInputCommandInteraction) {
    interaction.reply("List");
}

export const command_string = new SlashCommandBuilder()
    .setName("list")
    .setDescription("List all streamers that are being watched")
    .toJSON();
