import { ApplyOptions } from "@sapphire/decorators";
import { Command, CommandOptions } from "@sapphire/framework";
import { reply } from "@sapphire/plugin-editable-commands";
import type { Message } from "discord.js";

@ApplyOptions<CommandOptions>({
  description: "Displays all commands and their descriptions",
})
export default class extends Command {
  async messageRun(message: Message): Promise<Message | Message[]> {
    return reply(message, {
      embeds: [
        {
          title: "Commands",
          description: `${this.container.stores
            .get("commands")
            .map(
              (command) =>
                `\`a!${command.name} - ${command.category} - ${command.description}\``
            )
            .join("\n")}`,
          footer: { text: "Axios v1.0.0 | Sapphire v2.2.1-stable" },
          color: "BLUE",
        },
      ],
    });
  }
}
