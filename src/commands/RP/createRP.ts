import { Args, Command } from "@sapphire/framework";
import { reply } from "@sapphire/plugin-editable-commands";
import type { Message } from "discord.js";


export default class extends Command {
    async messageRun(message: Message, args: Args): Promise<Message | Message[]> {
        return reply(message, `Soon:tm:.`);
    }
}