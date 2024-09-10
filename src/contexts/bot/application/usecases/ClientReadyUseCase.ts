import { 
  Client, 
  ActivityType, 
} from 'discord.js';

import { container, } from '@ioc/di';
import { initializeI18n, } from '@locales/init';

import { DatabaseConnection, } from '@shared/domain/DatabaseConnection';

import { ClientReadyPort, } from '@application/ports/ClientReadyPort';

export class ClientReadyUseCase implements ClientReadyPort {
  constructor(
    private readonly database: DatabaseConnection = container
      .resolve<DatabaseConnection>('DatabaseConnection'),
  ) {}

  async execute(client: Client): Promise<void> {
    console.log('Bot ready: ', client.user?.displayName);

    await initializeI18n();
    await this.database.connect();

    client.user?.setActivity(client.user?.displayName, {
      type: ActivityType.Playing,
    });
  };
}