import { LogLevel, SapphireClient } from "@sapphire/framework";

export class LawsonClient extends SapphireClient {
  /**
   *
   */

  public async login(token: string) {
    return super.login(token);
  }

  constructor() {
    super({
      defaultPrefix: "a!",
      intents: [
        "GUILDS",
        "GUILD_MEMBERS",
        "GUILD_BANS",
        "GUILD_EMOJIS_AND_STICKERS",
        "GUILD_VOICE_STATES",
        "GUILD_MESSAGES",
        "GUILD_MESSAGE_REACTIONS",
        "DIRECT_MESSAGES",
        "DIRECT_MESSAGE_REACTIONS",
      ],
      shards: "auto",
      logger: {
        level: LogLevel.Debug,
      },
    });
  }
}
