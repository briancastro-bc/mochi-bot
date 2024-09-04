import { Guild, } from 'discord.js';

export interface GuildCreatePort {
  execute(guild: Guild): Promise<void>;
}