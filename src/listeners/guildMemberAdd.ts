import { ApplyOptions } from "@sapphire/decorators";
import { Events, Listener, ListenerOptions } from "@sapphire/framework";
import { GuildMember, MessageEmbed, TextChannel } from "discord.js";

@ApplyOptions<ListenerOptions>({ event: Events.GuildMemberAdd })
export class GuildMemberAdd extends Listener {
  async run(member: GuildMember) {
    if (member.guild.id === "895593078751125555") {
      const channel = member.guild?.channels.cache.get(
        "925186390893932584"
      ) as TextChannel;

      const embed = new MessageEmbed()
        .setTitle("New member!")
        .setDescription(
          `Welcome to ${member.guild.name}, ${member.user.tag}!
        We are an Onward based Roleplay server that aims to fulfill immersion and enjoyability for all members.


        Wanna be a cop? **We got that.**
        Wanna be a Civilian? **We got that.** 
        Wanna be a Criminal? **We got that.**
        Wanna be a nasty terrorist? **We got that.**`
        )
        .addField("Read the rules!", "<#895593079472533544>", true)
        .addField("Go read up about us!", "<#898634977116319765>", true)
        .addField("Go apply for something!", "<#898753633380884480>", true)
        .addField("\u2800", "\u2800", true)
        .addField(
          "And the most important rule, have fun!",
          "<#929522993279942707>",
          true
        )
        .addField("\u2800", "\u2800", true)
        .setColor("BLUE")
        .setThumbnail(member.user.displayAvatarURL())
        .setTimestamp();
      await channel.send({ embeds: [embed], content: `${member}` });
    }
  }
}
