import { SlashCommandBuilder } from "@discordjs/builders";
import { ApplyOptions } from "@sapphire/decorators";
import { ApplicationCommandRegistry, Command, CommandOptions } from "@sapphire/framework";
import { CommandInteraction, MessageEmbed } from "discord.js";
import { snipes } from "../../bot";

@ApplyOptions<CommandOptions>({
  description: "Retrieve the last deleted message in the channel.",
  typing: true,
})
export default class extends Command {
  // async messageRun(message: Message) {
  //   const snipe = snipes.get(message.channel.id);

  //   if (!snipes.has(message.channel.id)) {
  //     return message.channel.send("There is no message to retrieve.");
  //   }

  //   const embed = new MessageEmbed()
  //     .setAuthor({
  //       name: snipe?.author.tag as string,
  //       iconURL: snipe?.author.displayAvatarURL({ dynamic: true }),
  //     })
  //     .setDescription(
  //       snipe?.content ??
  //         "Looks like they sent an embed (I can't fucking read that shit)."
  //     )
  //     .setColor("GREEN")
  //     .setTimestamp(message.createdAt);

  //   return await message.channel.send({ embeds: [embed] });
  // }

  registerApplicationCommands(registry: ApplicationCommandRegistry) {
    const builder = new SlashCommandBuilder()
      .setName(this.name)
      .setDescription(this.description)
    
    registry.registerChatInputCommand(builder);
  }

  chatInputRun(interaction: CommandInteraction) {
    const snipe = snipes.get(interaction.channelId);

    if (snipes.has(interaction.channelId)) {
      return interaction.reply("There's no message to snipe, dumbass.");
    }

      const embed = new MessageEmbed()
        .setAuthor({
          name: snipe?.author.tag as string,
          iconURL: snipe?.author.displayAvatarURL({ dynamic: true }),
        })
        .setDescription(
          snipe?.content ??
            "Looks like they sent an embed (I can't fucking read that shit)."
        )
        .setColor("GREEN")
      .setTimestamp(interaction.createdAt);
    
    return interaction.reply({embeds: [embed]})
  }
}
