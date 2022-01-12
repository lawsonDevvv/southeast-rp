import { ApplyOptions } from "@sapphire/decorators";
import { MessagePrompter } from "@sapphire/discord.js-utilities";
import { Args, Command, CommandOptions } from "@sapphire/framework";
import { reply } from "@sapphire/plugin-editable-commands";
import { captureException } from "@sentry/node";
import type { Message } from "discord.js";

@ApplyOptions<CommandOptions>({
  description: "Creates an RP session.",
  enabled: true,
})
export default class extends Command {
  async messageRun(message: Message, args: Args) {
    const map = new MessagePrompter("What map is this on?", "message");

    const mapResult = (await map.run(
      message.channel,
      message.author
    )) as Message;

    const host = new MessagePrompter(
      "What is the host's Oculus username?",
      "message"
    );

    const hostResult = (await host.run(
      message.channel,
      message.author
    )) as Message;

    const code = new MessagePrompter("What's the code?", "message");

    const codeResult = (await code.run(
      message.channel,
      message.author
    )) as Message;

    const startsAt = new MessagePrompter(
      "When does this start? (5 reacts minimum required)",
      "message"
    );

    const startsAtResult = (await startsAt.run(
      message.channel,
      message.author
    )) as Message;

    const adminVerification = new MessagePrompter(
      "Which admin verified this RP (dont lie, we know).",
      "message"
    );

    const adminVerificationResult = (await adminVerification.run(
      message.channel,
      message.author
    )) as Message;

    reply(message, `${mapResult.content} - ${hostResult.content} - ${codeResult.content} - ${startsAtResult.content} - ${adminVerificationResult.content}`);
  }
}
