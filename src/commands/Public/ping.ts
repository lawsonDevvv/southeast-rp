import { ApplyOptions } from "@sapphire/decorators";
import { Command, CommandOptions } from "@sapphire/framework";
import { reply } from "@sapphire/plugin-editable-commands";
import { Message, MessageEmbed } from "discord.js";

@ApplyOptions<CommandOptions>({
  description: "Ping!",
})
export default class extends Command {
  async messageRun(message: Message) {
    const embed = new MessageEmbed()
      .setTitle("Pong!")
      .setDescription(`${this.container.client.ws.ping}ms`)
      .setFooter({ text: "SoutheastOS v1.0.0 | Sapphire v2.2.1-stable" })
      .setColor(this.container.client.ws.ping < 500 ? "GREEN" : "RED");
    reply(message, {
      embeds: [embed],
    });
  }

  async onLoad() {
    console.log(`Loaded command ${this.name}`);
  }
}
