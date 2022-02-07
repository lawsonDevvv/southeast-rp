import { ApplyOptions } from "@sapphire/decorators";
import { Events, Listener, ListenerOptions } from "@sapphire/framework";
import { Message, MessageEmbed, TextChannel } from "discord.js";
import { editsnipes } from "../bot";

@ApplyOptions<ListenerOptions>({
  event: Events.MessageUpdate,
})
export default class extends Listener {
  async run(oldMessage: Message, newMessage: Message) {
    // edit snipe stuff
    // set map for channelid to array of old message and new message (to be accessed in editsnipe.ts in commands/Public)

    // ignore message if old content is same as new content
    // fixes issue where messages with links that embed get editted by discord to add the embed
    // and it gets caught here
    if (oldMessage.content === newMessage.content) {
      return;
    }

    editsnipes.set(oldMessage.channelId, [oldMessage, newMessage]);
      
    // logging shit
    const channel = this.container.client.channels.cache.get(
      "899190354421637160"
    ) as TextChannel;

    const embed = new MessageEmbed()
      .setAuthor({
        name: oldMessage.author.tag,
        iconURL: oldMessage.author.displayAvatarURL({ dynamic: true }),
      })
      .setTitle("Message Edited")
      .setDescription(`Old Message: ${oldMessage.content}\n\nNew Message: ${newMessage}`)
      .setTimestamp(Date.now());

    channel.send({ embeds: [embed] });
  }
}
