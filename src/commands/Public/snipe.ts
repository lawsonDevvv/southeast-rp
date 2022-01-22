import { ApplyOptions } from "@sapphire/decorators";
import { Command, CommandOptions } from "@sapphire/framework";
import { Message, MessageEmbed } from "discord.js";
import { snipes } from "../../bot";
import { captureException } from "@sentry/node";

@ApplyOptions<CommandOptions>({
  description: "Retrieve the last deleted message in the channel.",
  typing: true,
})
export default class extends Command {
  async messageRun(message: Message) {
    const snipe = snipes.get(message.channel.id);

    if (!snipes.has(message.channel.id)) {
      return message.channel.send("There is no message to retrieve.");
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
      .setTimestamp(message.createdAt);

    return await message.channel.send({ embeds: [embed] });
  }
}
