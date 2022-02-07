import { SlashCommandBuilder } from "@discordjs/builders";
import { ApplyOptions } from "@sapphire/decorators";
import {
  ApplicationCommandRegistry,
  Command,
  CommandOptions,
} from "@sapphire/framework";
import type { CommandInteraction, TextChannel } from "discord.js";

@ApplyOptions<CommandOptions>({
  description: "Requests a specific service (police, marines, fire, ems, etc.)",
})
export default class extends Command {
  registerApplicationCommands(registry: ApplicationCommandRegistry) {
    const builder = new SlashCommandBuilder()
      .setName(this.name)
      .setDescription(this.description)
      .addStringOption((o) =>
        o
          .setName("type")
          .setDescription("What type of service you want to call!")
          .addChoice("Police", "police")
          .setRequired(true)
      )
      .addStringOption((o) =>
        o
          .setName("call_info")
          .setDescription(
            "The call information that will be passed on to emergency services."
          )
          .setRequired(true)
      );

    registry.registerChatInputCommand(builder);
  }

  async chatInputRun(interaction: CommandInteraction) {
    const channel = this.container.client.guilds.cache
      // Find OPD Server
      .get("906690226984980502")
      // Find #help-is-required channel
      ?.channels.cache.get("906694882276544512") as TextChannel;
    await channel.send(
      `@everyone - Incoming Call for Help - Respond to the Current RPn\n\nCall Info: ${interaction.options.getString(
        ""
      )}\n\n*Called by ${interaction.user}*`
    );
    return await interaction.reply("Done.");
  }
}
