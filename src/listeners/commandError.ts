import { ApplyOptions } from "@sapphire/decorators";
import {
  CommandErrorPayload,
  Events,
  Listener,
  ListenerOptions,
} from "@sapphire/framework";
import { reply } from "@sapphire/plugin-editable-commands";

@ApplyOptions<ListenerOptions>({
  event: Events.CommandError,
})
export default class extends Listener {
  async run(error: Error, payload: CommandErrorPayload) {
    reply(
      payload.message,
      `This command died while it was running...
      
        Cause of death: **ate shit**
        Time of death: **${new Date().toLocaleString()} EST**
        Error Produded: \`${error.name}: ${error.message}\`


DM Lawson or try again.`
    );
  }
}
