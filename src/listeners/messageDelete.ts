import { ApplyOptions } from "@sapphire/decorators";
import { Events, Listener, ListenerOptions } from "@sapphire/framework";
import type { Message } from "discord.js";
import { snipes } from "../bot";

@ApplyOptions<ListenerOptions>({
    event: Events.MessageDelete
})
export default class extends Listener {
    async run(message: Message) {
        snipes.set(message.channel.id, message);
        console.log(snipes);
        console.log ("~wave~")
    }
}
