import { ApplyOptions } from "@sapphire/decorators";
import { Args, Command, CommandOptions } from "@sapphire/framework";
import { reply } from "@sapphire/plugin-editable-commands";
import type { Message } from "discord.js";

@ApplyOptions<CommandOptions>({
    description: "Displays all commands and their descriptions"
})
export default class extends Command {
  async messageRun(message: Message, args: Args): Promise<Message | Message[]> {
    return reply(message, `Soon:tm:.`);
  }
}
