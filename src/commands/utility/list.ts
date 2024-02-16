import {
    ButtonStyle,
    ButtonBuilder,
    SlashCommandBuilder,
    ChatInputCommandInteraction,
    ActionRowBuilder,
    ChatInputCommandInteraction,
    SlashCommandBuilder
} from "discord.js";
import { STREAMER_URL } from "../../constants/url.js";
import { getDatabase } from "../../db/db.js";

export async function execute(interaction: ChatInputCommandInteraction) {
    const table = await getDatabase();

    const streamers = await table.findAll({
        where: {
            guildID: interaction.guildId,
            channelID: interaction.channelId
        }
    });

    const list = streamers.map((streamer) => streamer.streamer);

    const buttons = [];
    for (const streamer of list) {
        const button = new ButtonBuilder().setLabel(streamer).setURL(STREAMER_URL(streamer)).setStyle(ButtonStyle.Link);
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
