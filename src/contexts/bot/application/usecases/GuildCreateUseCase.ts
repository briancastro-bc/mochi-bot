import { 
  Guild, 
  PermissionFlagsBits, 
} from 'discord.js';
import { changeLanguage, } from 'i18next';

import { container, } from '@ioc/di';

import { Bot as BotConfig, } from '@domain/models/Bot';
import { Guild as GuildConfig, } from '@domain/models/Guild';
import { BotRepository, } from '@domain/repositories/BotRepository';
import { GuildRepository, } from '@domain/repositories/GuildRepository';

import { GuildCreatePort, } from '@application/ports/GuildCreatePort';

export class GuildCreateUseCase implements GuildCreatePort {
  constructor(
    private readonly botId: string = container
      .resolve<string>('application_id'),
    private readonly botRepository: BotRepository = container
      .resolve<BotRepository>('BotRepository'),
    private readonly guildRepository: GuildRepository = container
      .resolve<GuildRepository>('GuildRepository'),
  ) {}

  async execute(guild: Guild): Promise<void> {
    let guildFromDatabase = await this.guildRepository.findById(guild.id);
    if (!guildFromDatabase)
      guildFromDatabase = await this.saveGuildMetadata(guild);
    
    if (!guildFromDatabase) throw new Error('Cant fetch o create guild in db');

    await changeLanguage(guildFromDatabase?.language);

    try {
      let botRole = guild.roles.cache.find((r) => r.name === guild.name);
      if (!botRole) {
        botRole = await guild.roles.create({
          name: guild.name,
          color: 0xcc0000,
          mentionable: true,
          hoist: true,
        });
      }

      if (!botRole) throw new Error('Cant find or create bot role');

      const bot =
        guild.members.cache.get(this.botId) ??
        (await guild.members.fetch(this.botId));

      if (!bot) return;

      await bot.roles.add(botRole);

      await this.saveBotMetadata({
        _id: guildFromDatabase._id,
      });
    } catch (e) {
      // TODO: create event channel for show errors.
      console.error(e);
    }
  }

  private async saveBotMetadata(metadata: BotConfig): Promise<void> {
    await this.botRepository.create<BotConfig>(metadata);
  }

  private async saveGuildMetadata(metadata: Guild): Promise<GuildConfig | null> {
    const result = await this.guildRepository.create<GuildConfig>({
      _id: metadata?.id,
      icon: metadata?.iconURL()!,
      name: metadata?.name,
      description: metadata?.description,
      membersCount: metadata?.memberCount,
      ownerId: metadata?.ownerId,
      language: metadata?.preferredLocale,
      available: metadata?.available,
      banner: metadata?.banner,
      bot: {
        _id: metadata?.id,
      },
    });

    if (!result) return null;

    return result;
  }
}
