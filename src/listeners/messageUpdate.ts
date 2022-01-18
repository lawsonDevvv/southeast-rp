import { ApplyOptions } from "@sapphire/decorators";
import { Events, Listener, ListenerOptions } from "@sapphire/framework";
import type { Message } from "discord.js";
import { editsnipes } from "../bot";

@ApplyOptions<ListenerOptions>({
    event: Events.MessageUpdate
})
export default class extends Listener {
    async run(oldMessage: Message, newMessage: Message) {
        editsnipes.set(oldMessage.channelId, [oldMessage, newMessage])
    }
}