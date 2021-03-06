import { ApplyOptions } from "@sapphire/decorators";
import { Events, Listener, ListenerOptions } from "@sapphire/framework";
import type { Message } from "discord.js";

@ApplyOptions<ListenerOptions>({
  event: Events.MessageCreate,
})
export default class extends Listener {
  async run(message: Message) {
    // Add Reactions for Team Apps and/or LOAs

    // Check if the message was sent in #pending-forms AND the message was sent by a webhook.
    if (message.channel.id === "895593080063926310" && message.webhookId) {
      message.react("<:Yes:899074935299911780>");
      message.react("<:No:899074935014686720>");
    }
  }
}
