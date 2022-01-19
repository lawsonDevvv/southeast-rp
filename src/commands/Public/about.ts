import { ApplyOptions } from "@sapphire/decorators";
import { Command, CommandOptions } from "@sapphire/framework";
import { reply } from "@sapphire/plugin-editable-commands";
import { Message, MessageEmbed } from "discord.js";
import seconds from "../../util/time/Seconds";

@ApplyOptions<CommandOptions>({
  description: "Displays information about SoutheastOS.",
  cooldownDelay: seconds(5),
})
export default class extends Command {
  async messageRun(message: Message) {
    const embed = new MessageEmbed()
      .setAuthor({
        name: message.author.tag,
        iconURL: message.author.displayAvatarURL({ dynamic: true }),
      })
      .setColor("BLUE")
      .setDescription(
        `This bot was made by PossiblySebo#0001 (Excelsior aka lawsonDevvv) with the help of lying#0001 (lyingnet).\n\n` +
          `If you would like to contribute to this project, you can do so by [clicking me](https://github.com/lawsondevvv/southeast-rp).\n` +
          `You can also click that if you're curious about what certain stuff does!\n\n` +
          `Created <t:1640445120:R>`
      );

    reply(message, { embeds: [embed] });
  }
}
