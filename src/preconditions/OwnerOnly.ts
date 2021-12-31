import { Precondition } from "@sapphire/framework";
import type { Message } from "discord.js";

export class UserPrecondition extends Precondition {
  public async run(message: Message) {
    return message.author.id === "415278805683404821"
      ? this.ok()
      : message.channel.send("No.").then(() => this.error({message: "You are not Lawson."}));
  }
}

declare module "@sapphire/framework" {
  interface Preconditions {
    OwnerOnly: never;
  }
}
