import { SlashCommandBuilder, ChatInputCommandInteraction } from "discord.js";

export function execute(interaction: ChatInputCommandInteraction) {
    const row = new ActionRowBuilder().addComponents(component);

    interaction.reply({ content: "Help", components: [row] });
}

export const command_string = new SlashCommandBuilder().setName("help").setDescription("Help and support").toJSON();
