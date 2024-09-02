import { 
  Client, 
  ActivityType, 
} from 'discord.js';

import { ClientReadyPort, } from '@application/ports/ClientReadyPort';

export class ClientReadyUseCase implements ClientReadyPort {
  async execute(client: Client): Promise<void> {
    console.log(`Bot is ready ${client.user?.tag}`);

    client.user?.setActivity(`${client.user?.tag}`, {
      type: ActivityType.Playing,
      url: 'https://example.com'
    });
  };
}