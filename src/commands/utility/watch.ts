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
import { GITHUB_URL, STREAMER_URL, API_V2_URL } from "../../constants/url.js";
import { getDatabase } from "../../db/db.js";
import { subscribePusher } from "../../pusher.js";

async function addPerson(interaction: ChatInputCommandInteraction, streamer: string) {
    const table = await getDatabase();

    const data = await table.findOne({
        where: {
            guildID: interaction.guildId,
            channelID: interaction.channelId,
            streamer: streamer
        }
    });

    if (!data) {
        await table.create({
            guildID: interaction.guildId,
            channelID: interaction.channelId,
            streamer: streamer
        });
    }

    subscribePusher(streamer);
}

export async function execute(interaction: ChatInputCommandInteraction) {
    const streamer = interaction.options.getString("streamer")!;

    const github = new ButtonBuilder().setLabel("GitHub").setURL(GITHUB_URL).setStyle(ButtonStyle.Link);
    const row = new ActionRowBuilder().addComponents(github);

    try {
        const res = await axios.get(API_V2_URL(streamer), {
            headers: HEADERS
        });
        const profile_pic = res.data.user.profile_pic;
        const embed = new EmbedBuilder()
            .setColor(0x00ff7f)
            .setAuthor({ name: streamer, iconURL: profile_pic, url: STREAMER_URL(streamer) })
            .setThumbnail(profile_pic)
            .setDescription(`Now watching ${streamer} for live events! 😊`);

        interaction.reply({ embeds: [embed], components: [row] });
        addPerson(interaction, streamer);
    } catch (error) {
        console.log(error);
        if (error instanceof AxiosError) {
            interaction.reply(`Streamer not found! 😞`);
        } else {
            interaction.reply(`Now watching ${streamer} for live events! 😊`);
            addPerson(interaction, streamer);
        }
    }
}

export const command_string = new SlashCommandBuilder()
    .setName("watch")
    .setDescription("Watches a new streamer for live events")
    .addStringOption((option) =>
        option.setRequired(true).setName("streamer").setDescription("The name of the streamer")
    )
    .toJSON();
