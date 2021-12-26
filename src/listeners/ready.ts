import { Listener, ListenerOptions } from "@sapphire/framework";
import { ApplyOptions } from '@sapphire/decorators';

@ApplyOptions<ListenerOptions>({
    event: "ready",
    name: "ready"
})
export default class extends Listener {
    async run(): Promise<void> {
        console.log(`

                     █████╗ ██╗  ██╗██╗ ██████╗ ███████╗
                    ██╔══██╗╚██╗██╔╝██║██╔═══██╗██╔════╝
                    ███████║ ╚███╔╝ ██║██║   ██║███████╗
                    ██╔══██║ ██╔██╗ ██║██║   ██║╚════██║
                    ██║  ██║██╔╝ ██╗██║╚██████╔╝███████║
                    ╚═╝  ╚═╝╚═╝  ╚═╝╚═╝ ╚═════╝ ╚══════╝

                    `);
        console.log(`${this.container.client.user?.tag} reporting for duty!`)
    }
}