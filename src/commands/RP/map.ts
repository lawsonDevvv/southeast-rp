import { SlashCommandBuilder } from "@discordjs/builders";
import { ApplyOptions } from "@sapphire/decorators";
import {
  ApplicationCommandRegistry,
  Command,
  CommandOptions,
} from "@sapphire/framework";
import { reply } from "@sapphire/plugin-editable-commands";
import { captureException } from "@sentry/node";
import type { CommandInteraction, Message } from "discord.js";

@ApplyOptions<CommandOptions>({
  typing: true,
  description: "Picks a map for ya'lls indecisive headasses.",
})
export default class extends Command {
  registerApplicationCommands(registry: ApplicationCommandRegistry) {
    const builder = new SlashCommandBuilder()
      .setName(this.name)
      .setDescription(this.description)
      .addStringOption((o) =>
        o
          .setName("type")
          .setDescription("The type of map you want to be returned.")
          .addChoice("Urban", "urban")
          .addChoice("MilSim", "milsim")
      );

    registry.registerChatInputCommand(builder);
  }

  chatInputRun(interaction: CommandInteraction) {
    const type = interaction.options.getString("type");

    switch (type) {
      case "urban":
        const urbanMaps = [
          "Suburbia",
          "Backstreets",
          "Quarantine",
          "Vacant",
          "The Hook 2.0",
        ];

        const urbanMap = Math.floor(Math.random() * (4 - 0) + 0);

        interaction.reply(`Your map is... drumroll please.............`);

        setTimeout(
          () =>
            interaction.editReply(
              `Your map is... drumroll please............. ${urbanMaps[urbanMap]}`
            ),
          3000
        );
        break;

      case "milsim":
        const milsimMaps = [
          "Downfall",
          "Kashlan",
          "Al-Madinah",
          "Paradise",
          "Sand",
          "Frostbite",
          "Ashes in the Snow",
          "The Hook 2.0",
        ];

        const milsimMap = Math.floor(Math.random() * (7 - 0) + 0);

        interaction.reply(`Your map is... drumroll please.............`);

        setTimeout(
          () =>
            interaction.editReply(
              `Your map is... drumroll please............. ${milsimMaps[milsimMap]}`
            ),
          3000
        );
    }
  }

  async urban(message: Message) {
    /**
     * Suburbia
     * Backstreets
     * Quarantine
     * Vacant
     * The Hook 2.0
     */

    const urbanMaps = [
      "Suburbia",
      "Backstreets",
      "Quarantine",
      "Vacant",
      "The Hook 2.0",
    ];

    try {
      const map = Math.floor(Math.random() * (4 - 0) + 0);

      reply(message, `Your map is... ${urbanMaps[map]}!`);
    } catch (error) {
      captureException(error, { tags: { name: this.name } });
    }
  }

  async milsim(message: Message) {
    /**
     * Downfall
     * Kashalan
     * Al-Madinah
     * Paradise
     * Sand
     * FrostBite
     * Ashes In The Snow
     * The Hook 2.0
     */

    const milsimMaps = [
      "Downfall",
      "Kashlan",
      "Al-Madinah",
      "Paradise",
      "Sand",
      "Frostbite",
      "Ashes in the Snow",
      "The Hook 2.0",
    ];

    try {
      const map = Math.floor(Math.random() * (7 - 0) + 0);

      reply(message, `Your map is... ${milsimMaps[map]}!`);
    } catch (error) {
      captureException(error, { tags: { name: this.name } });
    }
  }
}
