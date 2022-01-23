// This precondition only exists because of the nuke command. Why is there a nuke command? Izzy told me to make one, harass her- nah jk this was my idea, trollge

import { Precondition } from "@sapphire/framework";
import type { Message } from "discord.js";
import { disallowedResponses } from "../bot";

export class UserPrecondition extends Precondition {
  public async run(message: Message) {
    const response = Math.floor(Math.random() * (10 - 0) + 0);

    return ["415278805683404821", "780138986395926538"].includes(message.author.id)
      ? this.ok()
      : this.error({ message: disallowedResponses[response] });
  }
}

declare module "@sapphire/framework" {
  interface Preconditions {
    Nuke: never;
  }
}
