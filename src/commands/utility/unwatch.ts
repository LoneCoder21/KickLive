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

export async function execute(interaction: ChatInputCommandInteraction) {
    const streamer = interaction.options.getString("streamer")!;

    const res = await axios.get(`https://kick.com/api/v2/channels/${streamer}`, {
        headers: headers
    });
    const user: User = res.data.user;

    const embed = new EmbedBuilder()
        .setColor(0x00ff7f)
        .setAuthor({ name: streamer, iconURL: user.profile_pic, url: `https://kick.com/${streamer}` })
        .setThumbnail(user.profile_pic)
        .setDescription(`Not watching ${streamer} anymore! 👍`);

    const github = new ButtonBuilder()
        .setLabel("GitHub")
        .setURL("https://github.com/LoneCoder21/KickLive")
        .setStyle(ButtonStyle.Link);

    const row = new ActionRowBuilder().addComponents(github);

    interaction.reply({ embeds: [embed], components: [row] });
}

export const command_string = new SlashCommandBuilder()
    .setName("unwatch")
    .setDescription("Stop watching the streamer for live events")
    .addStringOption((option) =>
        option.setRequired(true).setName("streamer").setDescription("The name of the streamer")
    )
    .toJSON();
