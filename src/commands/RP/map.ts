import { ApplyOptions } from "@sapphire/decorators";
import { reply } from "@sapphire/plugin-editable-commands";
import { SubCommandPluginCommand } from "@sapphire/plugin-subcommands";
import { captureException } from "@sentry/node";
import type { Message } from "discord.js";

@ApplyOptions<SubCommandPluginCommand.Options>({
  typing: true,
    description: "Picks a map for ya'lls indecisive headasses.",
  subCommands: ['urban', 'milsim']
})
export default class extends SubCommandPluginCommand {
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
