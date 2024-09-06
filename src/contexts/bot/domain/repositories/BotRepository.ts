import { Bot, } from '@domain/models/Bot';
import { UnsuccessfullyOperation, } from '@domain/types/UnsuccesfullyOperation';

export interface BotRepository {
  findBotById(botId: string): Promise<Bot | null>;
  findBotByGuildId(guildId: string): Promise<Bot | null>;
  create<T>(bot: Bot): Promise<T | UnsuccessfullyOperation>;
  update<T>(bot: Bot): Promise<T | UnsuccessfullyOperation>;
  delete<T>(botId: string): Promise<T | UnsuccessfullyOperation>;
}