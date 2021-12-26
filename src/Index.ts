import { SapphireClient } from "@sapphire/framework";

require("dotenv").config();

const client = new SapphireClient({
  intents: ['GUILDS', 'GUILD_MESSAGES'],
  defaultPrefix: "a!",
});

client.login(process.env.CLIENT_SECRET);
