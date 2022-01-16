import { ApplyOptions } from "@sapphire/decorators";
import { Args, Command, CommandOptions } from "@sapphire/framework";
import { reply } from "@sapphire/plugin-editable-commands";
import { Message, MessageEmbed, TextChannel } from "discord.js";

@ApplyOptions<CommandOptions>({
    description: "Make a suggestion to be voted on in the suggestions channel."
})
export default class extends Command {
  async messageRun(message: Message, args: Args): Promise<Message> {
    if (args.finished) {
      return message.channel.send(
        "My dude, you wanna like, actually give me something to suggest?"
      );
    }

    const suggestion = await args.rest("string");

    // Suggestion Channel - Izzy's probably going to delete it/nuke it so this will be changed frequently.
    const sugestionChannel = message.guild?.channels.cache.get(
      "898836400240205824"
    ) as TextChannel;

    const suggestionEmbed = new MessageEmbed()
      .setAuthor({
        name: message.author.tag,
        iconURL: message.author.displayAvatarURL({ dynamic: true }),
      })
      .setColor("GREY")
      .setTitle(`Suggestion from ${message.author.tag}`)
      .setDescription(`${suggestion}`)
      .setTimestamp(Date.now());

    const suggestionMessage = await sugestionChannel.send({
      embeds: [suggestionEmbed],
    });
      
    const responseEmbed = new MessageEmbed().setDescription(
      `Done! You can view your suggestion by [clicking me](https://discord.com/channels/${message.guild?.id}/${suggestionMessage.channel.id}/${suggestionMessage.id})!`
    );

    return await reply(message, { embeds: [responseEmbed] });
  }
}
