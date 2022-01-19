import { Listener, ListenerOptions } from "@sapphire/framework";
import { ApplyOptions } from '@sapphire/decorators';

@ApplyOptions<ListenerOptions>({
  event: "ready",
  name: "ready",
})
export default class extends Listener {
  async run(): Promise<void> {
    this.container.logger.info(`${this.container.client.user?.tag} reporting for duty!`);

    this.container.client.user?.setActivity(`RIP KARL BOZO, LOST TO FUCKING SOUP`, { type: 'PLAYING' });
  }
}
