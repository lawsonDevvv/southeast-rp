import { ApplyOptions } from "@sapphire/decorators";
import { Command, CommandOptions } from "@sapphire/framework";
import type { Message } from "discord.js";
import { snipes } from "../../bot";

@ApplyOptions<CommandOptions>({
    description: "Retrieve the last deleted message in the channel.",
    typing: true,
})
export default class extends Command {
    async messageRun(message: Message) {
        const snipe = snipes.get(message.channel.id);
        console.log(snipes);
        if (!snipes.has(message.channel.id)) return message.channel.send("There is no message to retrieve.");
        return await message.channel.send(`The last deleted message in this from ${snipe?.author} in this channel was:\n\`\`\`${snipe?.content}\`\`\``);
    }
}