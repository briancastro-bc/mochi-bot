import { 
  Client, 
  ActivityType, 
} from 'discord.js';
import i18next from 'i18next';

import { container, } from '@ioc/di';

import es from '@assets/locales/en.json';
import en from '@assets/locales/es.json';

import { ClientReadyPort, } from '@application/ports/ClientReadyPort';

export class ClientReadyUseCase implements ClientReadyPort {
  async execute(client: Client): Promise<void> {
    console.log(`Bot is ready ${client.user?.tag}`);
    const guild_id = container.resolve<string>('server_id');

    client.user?.setActivity(`${client.user?.displayName}`, {
      type: ActivityType.Playing,
      url: 'https://example.com'
    });
    // await client?.user?.setUsername('CNN Legacy ES');

    const guild = await client?.guilds?.fetch(guild_id);
    const language = guild?.preferredLocale;

    await i18next.init<any>({
      lng: language,
      debug: true,
      resources: {
        en,
        es,
      },
      preload: ['en', 'es'],
      returnNull: true,
      returnObjects: true,
      lowerCaseLng: true,
      interpolation: {
        escapeValue: true,
      },
    });
  };
}