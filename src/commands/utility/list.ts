import {
    ButtonStyle,
    ButtonBuilder,
    SlashCommandBuilder,
    ChatInputCommandInteraction,
    ActionRowBuilder,
    ChatInputCommandInteraction,
    SlashCommandBuilder
} from "discord.js";

const list = ["xqc", "destiny", "roshtein", "gmhikaru", "pgl", "sliker"];

export async function execute(interaction: ChatInputCommandInteraction) {
    const buttons = [];
    list = list.slice(0, 25);
    for (const streamer of list) {
        const button = new ButtonBuilder()
            .setLabel(streamer)
            .setURL(`https://kick.com/${streamer}`)
            .setStyle(ButtonStyle.Link);
        buttons.push(button);
    }

    const rows = [];

    //5 components and 5 rows
    for (let i = 0; i < Math.floor((list.length + 4) / 5); ++i) {
        const rowbuttons = buttons.slice(i * 5, i * 5 + 5);
        const row = new ActionRowBuilder().addComponents(...rowbuttons);
        rows.push(row);
    }

    interaction.reply({ components: rows });
}

export const command_string = new SlashCommandBuilder()
    .setName("list")
    .setDescription("List all streamers that are being watched")
    .toJSON();
