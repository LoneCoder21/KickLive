import Pusher from "pusher-js";

const pusher = new Pusher("eb1d5f283081a78b932c", {
    cluster: "us2"
});

pusher.connection.bind("error", function (err) {
    console.log(err);
});

const channelid = 1764849; //destiny
const channel = pusher.subscribe(`chatrooms.${channelid}.v2`);
channel.bind("App\\Events\\ChatMessageEvent", (data) => {
    console.log(data);
});
