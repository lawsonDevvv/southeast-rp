import type { Message } from "discord.js";
import { LawsonClient } from "./lib/LawsonClient";

export const snipes = new Map<string, Message>();

const client = new LawsonClient();

async function main() {
  try {
    client.logger.info("Attempting to login...");
    await client.login(process.env.token ?? "0");
    client.logger.info("Successfully Logged In ✅");
  } catch (error) {
    client.logger.fatal("The token was empty. Please enter a valid token.");
    console.log(error);
  }
}

main();
