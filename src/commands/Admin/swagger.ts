import { SlashCommandBuilder } from "@discordjs/builders";
import { ApplyOptions } from "@sapphire/decorators";
import {
  ApplicationCommandRegistry,
  Command,
  CommandOptions,
} from "@sapphire/framework";
import type {
  CategoryChannelResolvable,
  CommandInteraction,
  TextChannel,
} from "discord.js";

@ApplyOptions<CommandOptions>({
  description: "Hiroshima.",
  preconditions: ["Nuke", "GuildTextOnly"],
})
export default class extends Command {
  registerApplicationCommands(registry: ApplicationCommandRegistry) {
    const builder = new SlashCommandBuilder()
      .setName(this.name)
      .setDescription(this.description);

    registry.registerChatInputCommand(builder);
  }

  async chatInputRun(interaction: CommandInteraction) {
    // im lazy
    // CASTING BC YES
    // DONT QUESTION MY MOTIVES
    const ch = interaction.channel as TextChannel;

    await interaction.reply(
      `Missile target locked: ${interaction.channel}\n|__ ${ch}\n\nIMMA CHARGHIN MAH LAZER`
    );

    setTimeout(() => {
      ch.clone({
        parent: ch.parent as CategoryChannelResolvable,
        position: ch.rawPosition,
        reason: `Hiroshima | This is ${interaction.user}'s fault.`,
      }).then((c) => {
        c.send(`I call this one the World War II Hydrogen Bomb.`);
      });

      ch.delete(`Hiroshima | This is ${interaction.user.tag}'s fault.`);
    }, 4000);
  }
}
