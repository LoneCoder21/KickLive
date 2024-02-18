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
import { HEADERS } from "../../constants/headers.js";
import axios, { AxiosError } from "axios";
import { STREAMER_URL, API_V1_URL, PROFILE_PIC_URL, GITHUB_URL } from "../../constants/url.js";

export async function execute(interaction: ChatInputCommandInteraction) {
    const streamer = interaction.options.getString("streamer")!;

    const streambutton = new ButtonBuilder()
        .setLabel("Watch Stream")
        .setURL(STREAMER_URL(streamer))
        .setStyle(ButtonStyle.Link);

    const github = new ButtonBuilder().setLabel("GitHub").setURL(GITHUB_URL).setStyle(ButtonStyle.Link);
    const row = new ActionRowBuilder().addComponents(streambutton, github);

    try {
        const res = await axios.get(API_V1_URL(streamer), {
            headers: HEADERS
        });

        const profile_pic: string = res.data.user.profile_pic;
        const category: string = res.data.recent_categories[0].name;
        const title: string = res.data.previous_livestreams[0].session_title;
        const thumbnail: string = res.data.previous_livestreams[0].thumbnail.src;

        const embed = new EmbedBuilder()
            .setColor(0x00ff7f)
            .setAuthor({ name: streamer, iconURL: profile_pic, url: STREAMER_URL(streamer) })
            .setTitle(title)
            .setURL(STREAMER_URL(streamer))
            .addFields({ name: "Category", value: category })
            .setImage(thumbnail)
            .setFooter({
                text: "time",
                iconURL: PROFILE_PIC_URL
            });

        interaction.reply({
            content: `@everyone ${streamer} is now live on Kick!`,
            embeds: [embed],
            components: [row]
        });
    } catch (error) {
        console.log(error);

        if (error instanceof AxiosError) {
            interaction.reply(`Streamer not found! 😞`);
        } else {
            interaction.reply({
                content: `@everyone ${streamer} is now live on Kick!`,
                components: [row]
            });
        }
    }
}

export const command_string = new SlashCommandBuilder()
    .setName("sample")
    .setDescription("Sample how the live notification will look like")
    .addStringOption((option) =>
        option.setRequired(true).setName("streamer").setDescription("The name of the streamer")
    )
    .toJSON();
