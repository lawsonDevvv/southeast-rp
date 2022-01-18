import { ApplyOptions } from "@sapphire/decorators";
import type { Args } from "@sapphire/framework";
import { reply } from "@sapphire/plugin-editable-commands";
import { SubCommandPluginCommand } from "@sapphire/plugin-subcommands";
import type { Message, TextChannel } from "discord.js";

@ApplyOptions<SubCommandPluginCommand.Options>({
  description: "Requests a specific service (police, marines, fire, ems, etc.)",
  subCommands: ["police", "marines", "fire", "ems"],
})
export default class extends SubCommandPluginCommand {
  async police(message: Message, args: Args) {
    if (args.finished) return reply(message, "Run that again, and this time, provide a description for it please!")
    const channel = this.container.client.guilds.cache
      // Find OPD Server
      .get("906690226984980502")
      // Find #help-is-required channel
      ?.channels.cache.get("906694882276544512") as TextChannel;
    await channel.send(
      `@everyone - Incoming Call for Help - Respond to the Current RPn\n\nCall Info: ${await args.rest("string")}\n\n*Called by ${message.author}*`
    );
    return await reply(message, "Done.");
  }
}
