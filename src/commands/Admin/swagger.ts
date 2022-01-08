import { ApplyOptions } from "@sapphire/decorators";
import { Command, CommandOptions } from "@sapphire/framework";
import { reply } from "@sapphire/plugin-editable-commands";
import type { CategoryChannelResolvable, Message, TextChannel } from "discord.js";

@ApplyOptions<CommandOptions>({
  description: "Hiroshima.",
})
export default class extends Command {
  async messageRun(message: Message) {
    // im lazy
    const ch = message.channel as TextChannel;

    await reply(
      message,
      `Missile target locked:\n|__ ${ch}\n\nIMMA CHARGHIN MAH LAZER`
    );

    setTimeout(() => {
      ch.clone({
        parent: ch.parent as CategoryChannelResolvable,
        position: ch.rawPosition,
        reason: `Hiroshima | This is ${message.author.tag}'s fault.`,
      }).then((c) => {
        c.send(`I call this one the World War II Hydrogen Bomb.`)
      });

      ch.delete(`Hiroshima | This is ${message.author.tag}'s fault.`);


    }, 4000);
  }
}
