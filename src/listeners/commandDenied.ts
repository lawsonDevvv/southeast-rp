import { ApplyOptions } from "@sapphire/decorators";
import { ChatInputCommandDeniedPayload, Events, Listener, ListenerOptions, UserError } from "@sapphire/framework";

@ApplyOptions<ListenerOptions>({
    event: Events.ChatInputCommandDenied
})
export default class extends Listener {
    async run(error: UserError, { interaction }: ChatInputCommandDeniedPayload) {
        interaction.reply("No.")
    }
}