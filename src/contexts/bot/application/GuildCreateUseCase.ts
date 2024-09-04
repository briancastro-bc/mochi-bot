import { Guild, } from 'discord.js';

import { container, } from '@ioc/di';

import { GuildCreatePort, } from '@application/ports/GuildCreatePort';
import { GuildRepository, } from '@domain/repositories/GuildRepository';

export class GuildCreateUseCase implements GuildCreatePort {

  constructor(
    private readonly guildRepository: GuildRepository = container
      .resolve<GuildRepository>('GuildRepository'),
  ) {}

  async execute(guild: Guild): Promise<void> {
    let guildFromDatabase = await this.guildRepository.findById(guild.id);

    if (!guildFromDatabase) 
      guildFromDatabase = await this.saveGuild(guild); 
  }

  private async saveGuild(guild: Guild): Promise<any> {
    const bot_id = container.resolve<string>('application_id');

    return await this.guildRepository.create({
      id: guild.id,
      icon: guild.iconURL()!,
      name: guild.name,
      membersCount: guild.memberCount,
      botId: bot_id!,
    });
  }
}