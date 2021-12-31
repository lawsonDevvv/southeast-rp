import { ApplyOptions } from "@sapphire/decorators";
import { Args, Command, CommandOptions } from "@sapphire/framework";
import { reply } from "@sapphire/plugin-editable-commands";
import type { Message } from "discord.js";

@ApplyOptions<CommandOptions>({
    description: "Evaluates arbitrary JavaScript code.",
    preconditions: ['OwnerOnly'],
})
export default class extends Command {
    async messageRun(message: Message, args: Args): Promise<void> {
        const code = await args.rest("string");
        const evaled = eval(code);
        try {
            reply(
              message,
              `Code: \`\`\`js\n${code}\n\`\`\`\n\n\n\nOutput: \`\`\`js\n${evaled}\n\`\`\``
            );
        } catch (e) {
            reply(message, `Code: \`\`\`js\n${code}\n\`\`\`\n\n\n\nOutput: \`\`\`js\n${e}\n\`\`\``);
        }
    }
}
