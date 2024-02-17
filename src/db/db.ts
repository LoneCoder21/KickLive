import Sequelize from "sequelize";

// import { Table, Column, Model } from "sequelize-typescript";

// @Table
// class Streamer extends Model {
//     @Column
//     guildID: string;

//     @Column
//     channelID: string;

//     @Column
//     streamer: string;
// }

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

const streamers_table = sequelize.define("streamers", {
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

export async function getDatabase() {
    return streamers_table;
}
