import { ApplyOptions } from "@sapphire/decorators";
import { Events, Listener, ListenerOptions } from "@sapphire/framework";
import { GuildMember, MessageEmbed, TextChannel } from "discord.js";

@ApplyOptions<ListenerOptions>({ event: Events.GuildMemberRemove })
export default class extends Listener {
  async run(member: GuildMember) {
    const embed = new MessageEmbed()
      .setAuthor({
        name: member.user.tag,
        iconURL: member.user.displayAvatarURL({ dynamic: true }),
      })
      .setTitle("Member Left")
      .setDescription(
        `${member.user.tag} left!\n\nI hope they enjoyed their stay though!\n\nCome back soon:tm:?`
      )
      .setTimestamp(Date.now())
      .setColor("RED");

    // casting because .get() returns a Channel not a TextChannel

    //  Admin Logging Channel
    (member.guild.channels.cache.get("899190354421637160") as TextChannel).send(
      { embeds: [embed] }
    );

    // #departures
    (member.guild.channels.cache.get("925186438608351344") as TextChannel).send(
      { embeds: [embed] }
    );
  }
}
