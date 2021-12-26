import { ApplyOptions } from "@sapphire/decorators";
import { Command, CommandOptions } from "@sapphire/framework";
import { reply } from "@sapphire/plugin-editable-commands";
import type { Message } from "discord.js";

@ApplyOptions<CommandOptions>({
  description: "Ping!",
})
export default class extends Command {
  async messageRun(message: Message) {
    reply(message, {
      embeds: [
        {
          title: "Pong!",
          description: `${this.container.client.ws.ping}ms`,
          footer: { text: "Axios v1.0.0 | Sapphire v2.2.1-stable" },
          color: "GREEN",
        },
      ],
    });
  }
}
