import Pusher from "pusher-js";
import axios, { AxiosError } from "axios";
import { HEADERS } from "./constants/headers.js";
import { Livestream } from "./types/Livestream.js";
import { getDiscordClient } from "./discord.js";
import { ButtonStyle, ButtonBuilder, EmbedBuilder, ActionRowBuilder } from "discord.js";
import { API_V2_URL, STREAMER_URL, PROFILE_PIC_URL, GITHUB_URL } from "./constants/url.js";
import { getDatabase } from "./db/db.js";
import { User } from "./types/User.js";

const watchstreamers = new Set<string>();
const pusher = new Pusher("eb1d5f283081a78b932c", {
    cluster: "us2"
});

export async function subscribePusher(name: string) {
    if (watchstreamers.has(name)) return;

    try {
        const res = await axios.get(API_V2_URL(name), {
            headers: HEADERS
        });
        const channelid = res.data.id;

        const channel = pusher.subscribe(`channel.${channelid}`);

        pusher.connection.bind("connected", function () {
            watchstreamers.add(name);
        });
        pusher.connection.bind("error", function (err) {
            console.log(err);
        });

        channel.bind("App\\Events\\StreamerIsLive", async (data: Livestream) => {
            const client = await getDiscordClient();
            if (!client.isReady) return;

            const res = await axios.get(API_V2_URL(name), {
                headers: HEADERS
            });
            console.log(res.data);
            const user: User = res.data.user;
            const thumbnail = res.data.livestream.thumbnail.url;
            const categories = res.data.recent_categories;

            const table = await getDatabase();

            const list = await table.findAll({
                where: {
                    streamer: name
                }
            });

            const embed = new EmbedBuilder()
                .setColor(0x00ff7f)
                .setAuthor({ name: name, iconURL: user.profile_pic, url: STREAMER_URL(name) })
                .setTitle(data.session_title)
                .setURL(STREAMER_URL(name))
                .addFields({ name: "Category", value: categories[0].name })
                .setImage(user.profile_pic)
                .setFooter({
                    text: data.created_at,
                    iconURL: PROFILE_PIC_URL
                });

            const streambutton = new ButtonBuilder()
                .setLabel("Watch Stream")
                .setURL(STREAMER_URL(name))
                .setStyle(ButtonStyle.Link);

            const github = new ButtonBuilder().setLabel("GitHub").setURL(GITHUB_URL).setStyle(ButtonStyle.Link);
            const row = new ActionRowBuilder().addComponents(streambutton, github);

            const channelIDS = list.map((entry) => entry.channelID);
            for (const channelID of channelIDS) {
                const discord_channel = client.channels.cache.get(channelID);
                discord_channel.send({
                    content: `@everyone ${name} is now live on Kick!`,
                    embeds: [embed],
                    components: [row]
                });
            }
        });
    } catch (error) {
        console.log(error);
    }
}

// TODO - Refactor discord UI code into separate components and remove duplication
