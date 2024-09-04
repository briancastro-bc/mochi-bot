import { Guild, } from '@domain/models/Guild';

export interface GuildRepository {
  findAll(): Promise<Array<Guild>>;
  findById(guildId: string): Promise<Guild | null>;
  create(guild: Guild): Promise<any>;
  update(guild: Guild): Promise<any>;
  delete(guildId: string): Promise<any>;
}