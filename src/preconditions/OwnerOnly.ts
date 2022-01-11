import { Precondition } from "@sapphire/framework";
import type { Message } from "discord.js";
import { disallowedResponses } from "../bot";

export class UserPrecondition extends Precondition {
  public async run(message: Message) {
    const response = Math.floor(Math.random() * (10 - 0) + 0);

    return message.author.id === "415278805683404821"
      ? this.ok()
      : this.error({ message: disallowedResponses[response] });
  }
}

declare module "@sapphire/framework" {
  interface Preconditions {
    OwnerOnly: never;
  }
}
