import { ApplyOptions } from "@sapphire/decorators";
import { Command, CommandOptions } from "@sapphire/framework";
import { reply } from "@sapphire/plugin-editable-commands";
import type { Message } from "discord.js";

@ApplyOptions<CommandOptions>({
    description: "Ping!"
})
export default class extends Command {
    async messageRun(message: Message) {
        reply(message, `Pong! ${this.container.client.ws.ping}ms`);
    }
}