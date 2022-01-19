import { ApplyOptions } from "@sapphire/decorators";
import { Command, CommandOptions } from "@sapphire/framework";
import { reply } from "@sapphire/plugin-editable-commands";
import { Message, MessageEmbed } from "discord.js";
import { editsnipes } from "../../bot";
import seconds from "../../util/time/Seconds";

@ApplyOptions<CommandOptions>({
  description: "Fetchs the old content of the last message that was editted.",
  aliases: ['esnipe'],
  cooldownDelay: seconds(10),
})
export default class extends Command {
  async messageRun(message: Message) {
    if (!editsnipes.has(message.channelId)) {
      return reply(
        message,
        "I'm going to take a wild guess and say that the bot was recently rebooted, because there's nothing for me to snipe."
      );
    }

    const snipe = editsnipes.get(message.channelId) as Message<boolean>[];

    const embed = new MessageEmbed()
      .setAuthor({
        name: snipe[0].author.tag,
        iconURL: message.author.displayAvatarURL({ dynamic: true }),
      })
      .setColor("GREEN")
      .setDescription(
        `Old Content\n================\n${snipe[0].content}\n\nNew Content\n================\n${snipe[1].content}`
      )
      .setTimestamp(Date.now())
      .setFooter({ text: `Requested by ${message.author.tag}` });

    return reply(message, { embeds: [embed] });
  }
}
