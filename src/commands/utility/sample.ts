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
import { STREAMER_URL, API_V2_URL, PROFILE_PIC_URL, GITHUB_URL } from "../../constants/url.js";

export async function execute(interaction: ChatInputCommandInteraction) {
    const streamer = interaction.options.getString("streamer")!;

    const res = await axios.get(API_V2_URL(streamer), {
        headers: HEADERS
    });
    const user: User = res.data.user;

    const embed = new EmbedBuilder()
        .setColor(0x00ff7f)
        .setAuthor({ name: streamer, iconURL: user.profile_pic, url: STREAMER_URL(streamer) })
        .setTitle("Some title")
        .setURL(STREAMER_URL(streamer))
        .addFields({ name: "Category", value: "Some category here" })
        .setImage(user.profile_pic)
        .setFooter({
            text: "time",
            iconURL: PROFILE_PIC_URL
        });

    const streambutton = new ButtonBuilder()
        .setLabel("Watch Stream")
        .setURL(STREAMER_URL(streamer))
        .setStyle(ButtonStyle.Link);

    const github = new ButtonBuilder().setLabel("GitHub").setURL(GITHUB_URL).setStyle(ButtonStyle.Link);
    const row = new ActionRowBuilder().addComponents(streambutton, github);

    interaction.reply({ content: `@everyone ${streamer} is now live on Kick!`, embeds: [embed], components: [row] });
}

export const command_string = new SlashCommandBuilder()
    .setName("sample")
    .setDescription("Sample how the live notification will look like")
    .addStringOption((option) =>
        option.setRequired(true).setName("streamer").setDescription("The name of the streamer")
    )
    .toJSON();
