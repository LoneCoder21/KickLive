import {
    inlineCode,
    ButtonStyle,
    ButtonBuilder,
    EmbedBuilder,
    SlashCommandBuilder,
    ChatInputCommandInteraction,
    ActionRowBuilder
} from "discord.js";
import { DOMAIN_URL, GITHUB_URL, PROFILE_PIC_URL } from "../../constants/url.js";

export function execute(interaction: ChatInputCommandInteraction) {
    const embed = new EmbedBuilder()
        .setColor(0x00ff7f)
        .setTitle("Commands")
        .setAuthor({
            name: "KickLive",
            iconURL: PROFILE_PIC_URL,
            url: DOMAIN_URL
        })
        .setThumbnail(PROFILE_PIC_URL)
        .addFields(
            { name: inlineCode("/help"), value: "Shows help and all commands" },
            { name: inlineCode("/watch - [name]"), value: "Watches a new streamer for live events" },
            { name: inlineCode("/unwatch - [name]"), value: "Stop watching the streamer for live events" },
            { name: inlineCode("/sample - [name]"), value: "Test a sample live notification" },
            { name: inlineCode("/list"), value: "List all streamers that are being watched" },
            { name: inlineCode("/reset"), value: "Reset the streamer list to nothing" }
        );

    const github = new ButtonBuilder().setLabel("GitHub").setURL(GITHUB_URL).setStyle(ButtonStyle.Link);
    const row = new ActionRowBuilder().addComponents(github);

    interaction.reply({ content: "Help", embeds: [embed], components: [row] });
}

export const command_string = new SlashCommandBuilder().setName("help").setDescription("Help and support").toJSON();
