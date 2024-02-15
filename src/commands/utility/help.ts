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
        .setAuthor({
            name: "KickLive",
            iconURL:
                "https://dbxmjjzl5pc1g.cloudfront.net/6a985671-90ef-4d3f-a249-4451800dc6a1/Kick-Favicon152x152.png",
            url: "https://kick.com"
        })
        .setThumbnail(
            "https://dbxmjjzl5pc1g.cloudfront.net/6a985671-90ef-4d3f-a249-4451800dc6a1/Kick-Favicon152x152.png"
        )
        .addFields(
            { name: inlineCode("/help"), value: "Shows help and all commands" },
            { name: inlineCode("/watch - [name]"), value: "Watches a new streamer for live events" },
            { name: inlineCode("/unwatch - [name]"), value: "Stop watching the streamer for live events" },
            { name: inlineCode("/list"), value: "List all streamers that are being watched" },
            { name: inlineCode("/sample"), value: "Test a sample live notification" }
        );

    const github = new ButtonBuilder()
        .setLabel("GitHub")
        .setURL("https://github.com/LoneCoder21/KickLive")
        .setStyle(ButtonStyle.Link);

    const row = new ActionRowBuilder().addComponents(github);

    interaction.reply({ content: "Help", embeds: [embed], components: [row] });
}

export const command_string = new SlashCommandBuilder().setName("help").setDescription("Help and support").toJSON();
