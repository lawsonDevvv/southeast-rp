import { ApplyOptions } from "@sapphire/decorators";
import { Args, Command, CommandOptions } from "@sapphire/framework";
import { Message, MessageEmbed } from "discord.js";

@ApplyOptions<CommandOptions>({
  description: "Restarts the bot.",
  preconditions: ["OwnerOnly"],
})
export default class extends Command {
  async messageRun(message: Message, args: Args) {
    const reason = await args.rest("string");

    const embed = new MessageEmbed()
      .setAuthor({
        name: message.author.tag,
        iconURL: message.author.displayAvatarURL({ dynamic: true }),
      })
      .setDescription(`Restart Incoming!\n\nStated Reason: \`${reason}\``)
      .setFooter({ text: `Requested by ${message.author.tag}` })
      .setTimestamp(Date.now());

    await message.channel.send({ embeds: [embed] });

    const embed2 = new MessageEmbed().setDescription(
      `Hey! Fucker! Yeah, you! I just fucking died. 2 possibilities: restart or error. CHECK YOUR FUCKING PM2 LOGS BITCH.`
    );

    await this.container.client.users.cache
      .get("415278805683404821")
      ?.send({ embeds: [embed2] });

    this.container.logger.warn(`Process exitted with code 0.`);

    process.exit(0);
  }
}
