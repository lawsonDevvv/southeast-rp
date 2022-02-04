import { ApplyOptions } from "@sapphire/decorators";
import { Events, Listener, ListenerOptions } from "@sapphire/framework";
import { Message, MessageEmbed, TextChannel } from "discord.js";
import { snipes } from "../bot";

@ApplyOptions<ListenerOptions>({
  event: Events.MessageDelete,
})
export default class extends Listener {
  async run(message: Message) {
    // snipe command stuff
    // set channel id to message object in map

    snipes.set(message.channel.id, message);

    // admin logging

    const channel = this.container.client.channels.cache.get(
      "899190354421637160"
    ) as TextChannel;

    const embed = new MessageEmbed()
      .setAuthor({
        name: message.author.tag,
        iconURL: message.author.displayAvatarURL({ dynamic: true }),
      })
      .setTitle("Message Deleted")
      .setDescription(`${message.content}`)
      .setTimestamp(Date.now());

    channel.send({ embeds: [embed] });
  }
}
