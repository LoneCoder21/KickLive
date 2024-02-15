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
import { HEADERS } from "../../constants/headers.js";
import axios from "axios";
import { API_V2_URL, GITHUB_URL, STREAMER_URL } from "../../constants/url.js";

export async function execute(interaction: ChatInputCommandInteraction) {
    const streamer = interaction.options.getString("streamer")!;

    const res = await axios.get(API_V2_URL(streamer), {
        headers: HEADERS
    });
    const user: User = res.data.user;

    const embed = new EmbedBuilder()
        .setColor(0x00ff7f)
        .setAuthor({ name: streamer, iconURL: user.profile_pic, url: STREAMER_URL(streamer) })
        .setThumbnail(user.profile_pic)
        .setDescription(`Not watching ${streamer} anymore! 👍`);

    const github = new ButtonBuilder().setLabel("GitHub").setURL(GITHUB_URL).setStyle(ButtonStyle.Link);
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
