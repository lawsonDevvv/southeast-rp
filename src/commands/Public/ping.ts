import { SlashCommandBuilder } from "@discordjs/builders";
import { ApplyOptions } from "@sapphire/decorators";
import { ApplicationCommandRegistry, Command, CommandOptions } from "@sapphire/framework";
import { CommandInteraction, MessageEmbed } from "discord.js";

@ApplyOptions<CommandOptions>({
  description: "Ping!",
})
export default class extends Command {
  registerApplicationCommands(registry: ApplicationCommandRegistry) {
    const builder = new SlashCommandBuilder()
      .setName("ping")
      .setDescription("Display the bot's latency to the API, mostly used to see if I'm dead or not.")
    
    registry.registerChatInputCommand(builder)
  }

  async chatInputRun(interaction: CommandInteraction) {
    const embed = new MessageEmbed()
      .setTitle("Pong!")
      .setDescription(`${this.container.client.ws.ping}ms`)
      .setFooter({ text: "SoutheastOS v1.0.0 | Sapphire v2.2.1-stable" })
      .setColor(this.container.client.ws.ping < 500 ? "GREEN" : "RED");
    interaction.reply({
      embeds: [embed],
    });
  }
}
