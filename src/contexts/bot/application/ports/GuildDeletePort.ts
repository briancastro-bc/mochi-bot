import { Guild, } from 'discord.js';

export interface GuildDeletePort {
  execute(guild: Guild): Promise<void>;
}