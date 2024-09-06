import { Bot, } from '@domain/models/Bot';
import { BotRepository, } from '@domain/repositories/BotRepository';
import { UnsuccessfullyOperation, } from '@domain/types/UnsuccesfullyOperation';

import { BotModel, } from '@infrastructure/models/BotModel';

export class DatabaseBotRepository implements BotRepository {
  async findBotById(botId: string): Promise<Bot | null> {
    try {
      const result = await BotModel.findById(botId);
      if (!result) return null;

      return result;
    } catch (e) {
      return null;
    }
  }

  async findBotByGuildId(guildId: string): Promise<Bot | null> {
    throw new Error('Method not implemented.');
  }

  async create<T>(bot: Bot): Promise<T | UnsuccessfullyOperation> {
    try {
      const result = await BotModel.create(bot);
      return result as T;
    } catch (e) {
      return { success: false, };
    }
  }

  async update<T>(bot: Bot): Promise<T | UnsuccessfullyOperation> {
    throw new Error('Method not implemented.');
  }

  async delete<T>(botId: string): Promise<T | UnsuccessfullyOperation> {
    throw new Error('Method not implemented.');
  }
}