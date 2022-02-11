import { ApplyOptions } from "@sapphire/decorators";
import {
  ChatInputCommandErrorPayload,
  Events,
  Listener,
  ListenerOptions,
} from "@sapphire/framework";

@ApplyOptions<ListenerOptions>({
  event: Events.ChatInputCommandError,
})
export default class extends Listener {
  async run(error: Error, payload: ChatInputCommandErrorPayload) {
    payload.interaction.reply(
      `This command died while it was running...
      
        Cause of death: **ate shit**
        Time of death: **${new Date().toLocaleString()} EST**
        Error Produded: \`${error.name}: ${error.message}\`


DM Lawson or try again.`
    );
  }
}
