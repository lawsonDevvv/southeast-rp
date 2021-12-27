import { ApplyOptions } from "@sapphire/decorators";
import { Command, CommandOptions } from "@sapphire/framework";
import { reply } from "@sapphire/plugin-editable-commands";
import type { Message, TextChannel } from "discord.js";

@ApplyOptions<CommandOptions>({
  description:
    "Generates a random number between 1000 and 9999 to be used as a code to an RP.",
})
export default class extends Command {
  async messageRun(message: Message) {
    const m = await reply(message, "Gimme a fuckin' second...");

    /** generate random number
     * 9999 is max number
     * 1000 is minimum number
     */
    const rng = Math.round(Math.random() * (9999 - 1000) + 1000);

    (
      message.guild?.channels.cache.get("925032510159736963") as TextChannel
    ).send({
      embeds: [
        {
          title: `RP Code Request by ${message.author.tag}`,
          fields: [
            {
              name: "Code Generated",
              value: `${rng}`,
              inline: true,
            },
            {
              name: "\u2800",
              value: "\u2800",
              inline: true,
            },
            {
              name: "Date & Time Generated",
              value: `${new Date().toLocaleString()} EST`,
              inline: true,
            },
          ],
          footer: { text: "Axios v1.0.0 | Sapphire v2.2.1-stable" },
          timestamp: new Date(),
        },
      ],
    });
    // edit message with the number
    m.edit(`${rng}`);
  }
}
