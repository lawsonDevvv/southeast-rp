import { SlashCommandBuilder } from "@discordjs/builders";
import { ApplyOptions } from "@sapphire/decorators";
import { ApplicationCommandRegistry, Command, CommandOptions } from "@sapphire/framework";
import { CommandInteraction, MessageEmbed, TextChannel } from "discord.js";

@ApplyOptions<CommandOptions>({
  description:
    "Generates a random number between 1000 and 9999 to be used as a code to an RP.",
})
export default class extends Command {
  async registerApplicationCommands(registry: ApplicationCommandRegistry) {
    const builder = new SlashCommandBuilder()
      .setName(this.name)
      .setDescription(this.description);
    
    registry.registerChatInputCommand(builder);
  }

  async chatInputRun(interaction: CommandInteraction) {
    await interaction.reply("Gimme a fuckin' second...");
    const rng = Math.round(Math.random() * (9999 - 1000) + 1000);

    /** generate random number
     * 9999 is max number
     * 1000 is minimum number
     */

    const embed = new MessageEmbed()
      .setTitle(`RP Code Request by ${interaction.user.tag}`)
      .addField("Code Generated", rng.toString())
      .addField("\u2800", "\u2800", true)
      .addField("Date & Time Generated", `${new Date()} EST`, true)
      .setFooter({ text: "SoutheastOS v1.0.0 | Sapphire v2.2.1-stable" })
      .setTimestamp();
    (
      interaction.guild?.channels.cache.get("925032510159736963") as TextChannel
    ).send({
      embeds: [embed],
    });
    // edit message with the number
    interaction.editReply(`${rng}`);
  }
}
