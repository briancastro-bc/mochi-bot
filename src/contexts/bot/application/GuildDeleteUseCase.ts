import { 
  Guild, 
} from 'discord.js';

import { GuildDeletePort, } from '@application/ports/GuildDeletePort';

export class GuildDeleteUseCase implements GuildDeletePort {
  constructor() {}

  async execute(guild: Guild): Promise<void> {
    const createdBotRole = guild.roles.cache.find((r) => r.name === guild.name);
    if (!createdBotRole) return;

    createdBotRole.permissions.remove('Administrator');

    await guild.roles.delete(createdBotRole);
  }
}
