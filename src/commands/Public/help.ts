import { SlashCommandBuilder } from "@discordjs/builders";
import { ApplyOptions } from "@sapphire/decorators";
import { ApplicationCommandRegistry, Command, CommandOptions } from "@sapphire/framework";
import { CommandInteraction, MessageEmbed } from "discord.js";

@ApplyOptions<CommandOptions>({
  description: "Displays all commands and their descriptions",
})
export default class extends Command {
  registerApplicationCommands(registry: ApplicationCommandRegistry) {
    const builder = new SlashCommandBuilder()
      .setName("help")
      .setDescription("Display all of my commands!");
    
    registry.registerChatInputCommand(builder);
  }

  async chatInputRun(interaction: CommandInteraction) {
    const embed = new MessageEmbed()
      .setTitle("Commands")
      .setDescription(
        `${this.container.stores
          .get("commands")
          .map(
            (command) =>
              `\`/${command.name} - ${command.category} - ${command.description}\``
          )
          .join("\n")}`
      )
      .setFooter({ text: "SoutheastOS v1.0.0 | Sapphire v2.2.1-stable" })
      .setColor("BLUE");
    interaction.reply({ embeds: [embed] });
  }
}
