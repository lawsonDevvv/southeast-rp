import { ApplyOptions } from "@sapphire/decorators";
import { CommandDeniedPayload, Events, Listener, ListenerOptions, UserError } from "@sapphire/framework";

@ApplyOptions<ListenerOptions>({
    event: Events.CommandDenied
})
export default class extends Listener {
    async run(error: UserError, { message }: CommandDeniedPayload) {
        message.channel.send(error.message)
    }
}