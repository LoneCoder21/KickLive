import {
    inlineCode,
    ButtonStyle,
    ButtonBuilder,
    EmbedBuilder,
    SlashCommandBuilder,
    ChatInputCommandInteraction,
    ActionRowBuilder
} from "discord.js";

export function execute(interaction: ChatInputCommandInteraction) {
    const embed = new EmbedBuilder()
        .setColor(0x00ff7f)
        .setTitle("Commands")
        .setAuthor({ name: "KickLive", iconURL: "https://i.imgur.com/AfFp7pu.png", url: "https://discord.js.org" })
        .setThumbnail("https://i.imgur.com/AfFp7pu.png")
        .addFields(
            { name: inlineCode("/help"), value: "Shows help and all commands" },
            { name: inlineCode("/watch - [name]"), value: "Watches a new streamer for live events" },
            { name: inlineCode("/unwatch - [name]"), value: "Stop watching the streamer for live events" },
            { name: inlineCode("/list"), value: "List all streamers that are being watched" }
        );

    const github = new ButtonBuilder()
        .setLabel("GitHub")
        .setURL("https://github.com/LoneCoder21/KickLive")
        .setStyle(ButtonStyle.Link);

    const row = new ActionRowBuilder().addComponents(github);

    interaction.reply({ content: "Help", embeds: [embed], components: [row] });
}

export const command_string = new SlashCommandBuilder().setName("help").setDescription("Help and support").toJSON();
