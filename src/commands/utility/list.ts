import {
    ButtonStyle,
    ButtonBuilder,
    EmbedBuilder,
    SlashCommandBuilder,
    ChatInputCommandInteraction,
    ActionRowBuilder,
    ChatInputCommandInteraction,
    SlashCommandBuilder
} from "discord.js";
import { User } from "../../types/User.js";
import { headers } from "../../constants/headers.js";
import axios from "axios";

const list = ["xqc", "destiny", "roshtein", "gmhikaru", "pgl"];

export async function execute(interaction: ChatInputCommandInteraction) {
    const embeds = [];

    for (const streamer of list) {
        const res = await axios.get(`https://kick.com/api/v2/channels/${streamer}`, {
            headers: headers
        });
        const user: User = res.data.user;
        console.log(user);
        const embed = new EmbedBuilder()
            .setColor(0x00ff7f)
            .setAuthor({ name: streamer, iconURL: user.profile_pic, url: `https://kick.com/${streamer}` });

        embeds.push(embed);
    }

    const github = new ButtonBuilder()
        .setLabel("GitHub")
        .setURL("https://github.com/LoneCoder21/KickLive")
        .setStyle(ButtonStyle.Link);

    const row = new ActionRowBuilder().addComponents(github);

    interaction.reply({ embeds: embeds, components: [row] });
}

export const command_string = new SlashCommandBuilder()
    .setName("list")
    .setDescription("List all streamers that are being watched")
    .toJSON();
