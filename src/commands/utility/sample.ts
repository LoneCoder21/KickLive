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
    console.log(res.data);
    const embed = new EmbedBuilder()
        .setColor(0x00ff7f)
        .setAuthor({ name: streamer, iconURL: user.profile_pic, url: `https://kick.com/${streamer}` })
        .setTitle("Some title")
        .setURL(`https://kick.com/${streamer}`)
        .addFields({ name: "Category", value: "Some category here" })
        .setImage(user.profile_pic)
        .setFooter({
            text: "time",
            iconURL: "https://dbxmjjzl5pc1g.cloudfront.net/6a985671-90ef-4d3f-a249-4451800dc6a1/Kick-Favicon152x152.png"
        });

    const streambutton = new ButtonBuilder()
        .setLabel("Watch Stream")
        .setURL(`https://kick.com/${streamer}`)
        .setStyle(ButtonStyle.Link);

    const github = new ButtonBuilder()
        .setLabel("GitHub")
        .setURL("https://github.com/LoneCoder21/KickLive")
        .setStyle(ButtonStyle.Link);

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
