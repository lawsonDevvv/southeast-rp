import { ApplyOptions } from "@sapphire/decorators";
import { Command, CommandOptions } from "@sapphire/framework";
import { reply } from "@sapphire/plugin-editable-commands";
import { Message, MessageEmbed } from "discord.js";

@ApplyOptions<CommandOptions>({
  description: "Displays all commands and their descriptions",
})
export default class extends Command {
  async messageRun(message: Message) {
    const embed = new MessageEmbed()
      .setTitle("Commands")
      .setDescription(
        `${this.container.stores
          .get("commands")
          .map(
            (command) =>
              `\`+${command.name} - ${command.category} - ${command.description}\``
          )
          .join("\n")}`
      )
      .setFooter({ text: "SoutheastOS v1.0.0 | Sapphire v2.2.1-stable" })
      .setColor("BLUE");
    return reply(message, { embeds: [embed] });
  }
}
