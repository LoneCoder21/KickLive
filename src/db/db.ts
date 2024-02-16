import Sequelize from "sequelize";

let streamers_table = null;

export async function getDatabase() {
    if (!streamers_table) {
        const sequelize = new Sequelize({
            dialect: "sqlite",
            logging: true,
            storage: "./database.sqlite"
        });

        try {
            await sequelize.authenticate();
            console.log("Connection has been established successfully.");
        } catch (error) {
            console.error("Unable to connect to the database:", error);
        }

        streamers_table = sequelize.define("streamers", {
            guildID: {
                type: Sequelize.STRING,
                allowNull: false
            },
            channelID: {
                type: Sequelize.STRING,
                allowNull: false
            },
            streamer: {
                type: Sequelize.STRING,
                allowNull: false
            }
        });
        streamers_table.sync();
    }
    return streamers_table;
}
