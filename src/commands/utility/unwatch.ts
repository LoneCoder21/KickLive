import { SlashCommandBuilder } from "discord.js";

export function execute(interaction: ChatInputCommandInteraction) {
    const streamer = interaction.options.getString("streamer");

    interaction.reply(`Not watching ${streamer} anymore! 👍`);
}

export const command_string = new SlashCommandBuilder()
    .setName("unwatch")
    .setDescription("Stop watching the streamer for live events")
    .addStringOption((option) =>
        option.setRequired(true).setName("streamer").setDescription("The name of the streamer")
    )
    .toJSON();

// TODO - Add image to embed of profile streamer pic
