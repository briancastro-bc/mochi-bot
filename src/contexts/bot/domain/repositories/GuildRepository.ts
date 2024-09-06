import { Guild, } from '@domain/models/Guild';
import { UnsuccessfullyOperation, } from '@domain/types/UnsuccesfullyOperation';

export interface GuildRepository {
  findAll(): Promise<Array<Guild>>;
  findById(guildId: string): Promise<Guild | null>;
  create<T>(guild: Guild): Promise<T | UnsuccessfullyOperation>;
  update<T>(guild: Guild): Promise<T | UnsuccessfullyOperation>;
  delete(guildId: string): Promise<any | UnsuccessfullyOperation>;
}