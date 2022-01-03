import { ApplyOptions } from "@sapphire/decorators";
import { Command, CommandOptions } from "@sapphire/framework";
import { reply } from "@sapphire/plugin-editable-commands";
import { Message, MessageEmbed, TextChannel } from "discord.js";

@ApplyOptions<CommandOptions>({
  description:
    "Generates a random number between 1000 and 9999 to be used as a code to an RP.",
})
export default class extends Command {
  async messageRun(message: Message) {
    const m = await reply(message, "Gimme a fuckin' second...");
    const rng = Math.round(Math.random() * (9999 - 1000) + 1000);

    /** generate random number
     * 9999 is max number
     * 1000 is minimum number
     */

    const embed = new MessageEmbed()
      .setTitle(`RP Code Request by ${message.author.tag}`)
      .addField("Code Generated", rng.toString())
      .addField("\u2800", "\u2800", true)
      .addField("Date & Time Generated", `${new Date()} EST`, true)
      .setFooter("SoutheastOS v1.0.0 | Sapphire v2.2.1-stable")
      .setTimestamp();
    (
      message.guild?.channels.cache.get("925032510159736963") as TextChannel
    ).send({
      embeds: [embed],
    });
    // edit message with the number
    m.edit(`${rng}`);
  }
}
