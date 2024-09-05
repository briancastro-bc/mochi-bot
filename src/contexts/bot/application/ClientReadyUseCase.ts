import { 
  Client, 
  ActivityType, 
} from 'discord.js';

import { ClientReadyPort, } from '@application/ports/ClientReadyPort';

export class ClientReadyUseCase implements ClientReadyPort {
  async execute(client: Client): Promise<void> {
    console.log('Bot ready: ', client.user?.displayName);

    client.user?.setActivity(client.user?.displayName, {
      type: ActivityType.Playing,
    });
  };
}