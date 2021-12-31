import { ApplyOptions } from "@sapphire/decorators";
import { Args, Command, CommandOptions } from "@sapphire/framework";
import type { Message } from "discord.js";

@ApplyOptions<CommandOptions>({
    description: "Set's the bot's status. Lawson only, bitch.",
    preconditions: ['OwnerOnly'],
})
export default class extends Command {
    async messageRun(message: Message<boolean>, args: Args) {
        const status = await args.rest("string");
        await message.channel.send(`Setting status to \`${status}\``);
        await message.client.user?.setActivity(status, { type: "PLAYING" });
    }   
}