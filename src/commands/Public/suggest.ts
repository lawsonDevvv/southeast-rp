import { SlashCommandBuilder } from "@discordjs/builders";
import { ApplyOptions } from "@sapphire/decorators";
import {
  ApplicationCommandRegistry,
  Command,
  CommandOptions,
} from "@sapphire/framework";
import {
  CommandInteraction,
  MessageEmbed,
  TextChannel,
} from "discord.js";
import minutes from "../../util/time/Minutes";

@ApplyOptions<CommandOptions>({
  description: "Makes a suggestion to be voted on in the suggestion channel.",
  cooldownDelay: minutes(1),
})
export default class extends Command {
  registerApplicationCommands(registry: ApplicationCommandRegistry) {
    const builder = new SlashCommandBuilder()
      .setName(this.name)
      .setDescription(this.description)
      .addStringOption((option) =>
        option
          .setName("suggestion")
          .setDescription("What you want to suggest!")
          .setRequired(true)
      );

    registry.registerChatInputCommand(builder);
  }

  // async messageRun(message: Message, args: Args): Promise<Message> {
  //   if (args.finished) {
  //     return message.channel.send(
  //       "My dude, you wanna like, actually give me something to suggest?"
  //     );
  //   }

  //   const suggestion = await args.rest("string");

  //   // Suggestion Channel - Izzy's probably going to delete it/nuke it so this will be changed frequently.
  //   const sugestionChannel = message.guild?.channels.cache.get(
  //     "898836400240205824"
  //   ) as TextChannel;

  //   const suggestionEmbed = new MessageEmbed()
  //     .setAuthor({
  //       name: message.author.tag,
  //       iconURL: message.author.displayAvatarURL({ dynamic: true }),
  //     })
  //     .setColor("GREY")
  //     .setTitle(`Suggestion from ${message.author.tag}`)
  //     .setDescription(`${suggestion}`)
  //     .setTimestamp(Date.now());

  //   const suggestionMessage = await sugestionChannel.send({
  //     embeds: [suggestionEmbed],
  //   });

  //   suggestionMessage.react("<:Yes:899074935299911780>");
  //   suggestionMessage.react("<:No:899074935014686720>");

  //   const responseEmbed = new MessageEmbed().setDescription(
  //     `Done! You can view your suggestion by [clicking me](https://discord.com/channels/${message.guild?.id}/${suggestionMessage.channel.id}/${suggestionMessage.id})!`
  //   );

  //   return await reply(message, { embeds: [responseEmbed] });
  // }

  async chatInputRun(interaction: CommandInteraction) {
    const suggestion = interaction.options.getString("suggestion");

    const sugestionChannel = interaction.guild?.channels.cache.get(
      "898836400240205824"
    ) as TextChannel;

    const suggestionEmbed = new MessageEmbed()
      .setAuthor({
        name: interaction.user.tag,
        iconURL: interaction.user.displayAvatarURL({ dynamic: true }),
      })
      .setColor("GREY")
      .setTitle(`Suggestion from ${interaction.user.tag}`)
      .setDescription(`${suggestion}`)
      .setTimestamp(Date.now());

    const suggestionMessage = await sugestionChannel.send({
      embeds: [suggestionEmbed],
    });

    suggestionMessage.react("<:Yes:899074935299911780>");
    suggestionMessage.react("<:No:899074935014686720>");

    const responseEmbed = new MessageEmbed().setDescription(
      `Done! You can view your suggestion by [clicking me](https://discord.com/channels/${interaction.guild?.id}/${suggestionMessage.channel.id}/${suggestionMessage.id})!`
    );

    interaction.reply({embeds: [responseEmbed]})
  }
}
