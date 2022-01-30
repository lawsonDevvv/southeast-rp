import { ApplyOptions } from "@sapphire/decorators";
import { MessagePrompter } from "@sapphire/discord.js-utilities";
import { Args, Command, CommandOptions } from "@sapphire/framework";
import { reply } from "@sapphire/plugin-editable-commands";
import { Message, MessageEmbed, TextChannel } from "discord.js";

@ApplyOptions<CommandOptions>({
  description: "Creates an RP session.",
  enabled: true,
})
export default class extends Command {
  async messageRun(message: Message, args: Args) {
    const map = new MessagePrompter("What map is this on?", "message");

    const mapResult = (await map.run(
      message.channel,
      message.author
    )) as Message;

    const host = new MessagePrompter(
      "What is the host's Oculus username?",
      "message"
    );

    const hostResult = (await host.run(
      message.channel,
      message.author
    )) as Message;

    const code = new MessagePrompter("What's the code?", "message");

    const codeResult = (await code.run(
      message.channel,
      message.author
    )) as Message;

    const startsAt = new MessagePrompter(
      "When does this start? (5 reacts minimum required)",
      "message"
    );

    const startsAtResult = (await startsAt.run(
      message.channel,
      message.author
    )) as Message;

    const adminVerification = new MessagePrompter(
      "Which admin verified this RP (dont lie, we know).",
      "message"
    );

    const adminVerificationResult = (await adminVerification.run(
      message.channel,
      message.author
    )) as Message;

    // reply(
    //   message,
    //   `${mapResult.content} - ${hostResult.content} - ${codeResult.content} - ${startsAtResult.content} - ${adminVerificationResult.content}`
    // );
    const embed = new MessageEmbed()
      .setAuthor({
        name: message.author.tag,
        iconURL: message.author.displayAvatarURL({ dynamic: true }),
      })
      .setTitle("New Roleplay!")
      .setDescription(`Generated by ${message.author}`)
      .addField("Host", `${hostResult}`, true)
      .addField("Map", `${mapResult}`, true)
      .addField("Code", `${codeResult}`, true)
      .addField("Starts At", `${startsAtResult}`, true)
      .addField("\u2800", "\u2800", true)
      .addField("Admin Verification", `${adminVerificationResult}`, true)
      .setFooter({ text: `Requested by ${message.author.tag}` })
      .setTimestamp(Date.now());

    const rpMessage = await (
      message.guild?.channels.cache.get("922537837621047376") as TextChannel
    ).send({ embeds: [embed], content: "<@&895593079187316764>" });

    await rpMessage.react("<:Yes:899074935299911780>");
    await rpMessage.react("<:No:899074935014686720>");

    const embed2 = new MessageEmbed().setDescription(
      `Done! You can view it by [clicking me](https://discord.com/channels/${rpMessage.guildId}/${rpMessage.channelId}/${rpMessage.id})!`
    );

    await reply(message, {
      embeds: [embed2],
    });
  }
}
