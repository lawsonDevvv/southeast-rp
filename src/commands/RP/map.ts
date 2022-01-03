import { ApplyOptions } from "@sapphire/decorators";
import { Command, CommandOptions } from "@sapphire/framework";
import { reply } from "@sapphire/plugin-editable-commands";
import { captureException } from "@sentry/node";
import type { Message } from "discord.js";

@ApplyOptions<CommandOptions>({
  typing: true,
  description: "Picks a map for ya'lls indecisive headasses.",
})
export default class extends Command {
  async messageRun(message: Message) {
    const maps = ["Suburbia", "Backstreets", "Quarantine", "Kashlan"];

    try {
      const map = Math.floor(Math.random() * (3 - 0) + 0);

      reply(message, `Your map is... ${maps[map]}!`);
    } catch (error) {
      captureException(error, { tags: { name: this.name } });
    }
  }
}
