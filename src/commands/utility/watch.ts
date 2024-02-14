import { SlashCommandBuilder } from "discord.js";

export function execute(interaction: ChatInputCommandInteraction) {
    interaction.reply("Watch");
}

export const command_string = new SlashCommandBuilder()
    .setName("watch")
    .setDescription("Watches a new streamer for live events")
    .addStringOption((option) =>
        option.setRequired(true).setName("streamer").setDescription("The name of the streamer")
    )
    .toJSON();
