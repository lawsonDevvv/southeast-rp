import { SlashCommandBuilder } from "@discordjs/builders";
import { ApplyOptions } from "@sapphire/decorators";
import {
  ApplicationCommandRegistry,
  Command,
  CommandOptions,
} from "@sapphire/framework";
import {
  CommandInteraction,
  Message,
  MessageEmbed,
  TextChannel,
} from "discord.js";
import { editsnipes } from "../../bot";
import seconds from "../../util/time/Seconds";

@ApplyOptions<CommandOptions>({
  description: "Fetchs the old content of the last message that was editted.",
  aliases: ["esnipe"],
  cooldownDelay: seconds(10),
})
export default class extends Command {
  // async messageRun(message: Message) {
  //   if (!editsnipes.has(message.channelId)) {
  //     return reply(
  //       message,
  //       "I'm going to take a wild guess and say that the bot was recently rebooted, because there's nothing for me to snipe."
  //     );
  //   }

  //   const snipe = editsnipes.get(message.channelId) as Message<boolean>[];

  //   const embed = new MessageEmbed()
  //     .setAuthor({
  //       name: snipe[0].author.tag,
  //       iconURL: snipe[0].author.displayAvatarURL({ dynamic: true }),
  //     })
  //     .setColor("GREEN")
  //     .setDescription(
  //       `Old Content\n================\n${snipe[0].content}\n\nNew Content\n================\n${snipe[1].content}`
  //     )
  //     .setTimestamp(Date.now())
  //     .setFooter({ text: `Requested by ${message.author.tag}` });

  //   return reply(message, { embeds: [embed] });
  // }

  registerApplicationCommands(registry: ApplicationCommandRegistry) {
    const builder = new SlashCommandBuilder()
      .setName("editsnipe")
      .setDescription(
        "Fetches the old content and new content of the last message that was updated."
      );

    registry.registerChatInputCommand(builder);
  }

  chatInputRun(interaction: CommandInteraction) {
    if (!editsnipes.has((interaction.channel as TextChannel).id)) {
      interaction.reply({});
    }

    const snipe = editsnipes.get(interaction.channelId) as Message<boolean>[];

    const embed = new MessageEmbed()
      .setAuthor({
        name: snipe[0].author.tag,
        iconURL: snipe[0].author.displayAvatarURL({ dynamic: true }),
      })
      .setColor("GREEN")
      .setDescription(
        `Old Content: ${snipe[0].content}\n\nNew Content: ${snipe[1].content}`
      )
      .setTimestamp(Date.now())
      .setFooter({ text: `Requested by ${interaction.user.tag}` });
    
    interaction.reply({embeds: [embed]})
  }
}
