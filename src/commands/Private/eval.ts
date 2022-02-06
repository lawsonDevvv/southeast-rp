import { SlashCommandBuilder } from "@discordjs/builders";
import { ApplyOptions } from "@sapphire/decorators";
import { ApplicationCommandRegistry, Command, CommandOptions } from "@sapphire/framework";
import { CommandInteraction, MessageEmbed } from "discord.js";

@ApplyOptions<CommandOptions>({
  preconditions: ["OwnerOnly"]
})
export abstract class EvalCommand extends Command {
  // async messageRun(message: Message, args: Args): Promise<void> {
  //     const code = await args.rest("string");
  //     const evaled = eval(code);
  //     try {
  //         reply(
  //           message,
  //           `Code: \`\`\`js\n${code}\n\`\`\`\n\n\n\nOutput: \`\`\`js\n${evaled}\n\`\`\``
  //         );
  //     } catch (e) {
  //         reply(message, `Code: \`\`\`js\n${code}\n\`\`\`\n\n\n\nOutput: \`\`\`js\n${e}\n\`\`\``);
  //     }
  // }

  public registerApplicationCommands(registry: ApplicationCommandRegistry) {
    const builder = new SlashCommandBuilder()
      .setName("eval")
      .setDescription("Evaluate arbitrary JavaScript code.")
      .addStringOption((option) =>
        option
          .setName("code")
          .setDescription("Code to evaluate.")
          .setRequired(true)
      );

    registry.registerChatInputCommand(builder);
  }

  public chatInputRun(interaction: CommandInteraction) {
    const code = interaction.options.getString("code") as string;

    try {
      const evaled = eval(code);

      const embed = new MessageEmbed()
        .setAuthor({
          name: interaction.user.tag,
          iconURL: interaction.user.displayAvatarURL({ dynamic: true }),
        })
        .addField("Code to be Evaluated", `\`\`\`ts\n${code}\`\`\``)
        .addField("Result", `${evaled}`)
        .addField("Result Type", `${typeof evaled}`);

      interaction.reply({ embeds: [embed] });
    } catch (err) {
      const embed = new MessageEmbed()
        .setAuthor({
          name: interaction.user.tag,
          iconURL: interaction.user.displayAvatarURL({ dynamic: true }),
        })
        .addField("Code to be Evaluated", `\`\`\`ts\n${code}\`\`\``)
        .addField("Error", `${err}`)
        .setColor("RED");

      interaction.reply({embeds: [embed]});
    }
  }
}
