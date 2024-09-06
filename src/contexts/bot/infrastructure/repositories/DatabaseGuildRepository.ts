import { Guild, } from '@domain/models/Guild';
import { GuildRepository, } from '@domain/repositories/GuildRepository';
import { UnsuccessfullyOperation, } from '@domain/types/UnsuccesfullyOperation';

import { GuildModel, } from '@infrastructure/models/GuildModel';

export class DatabaseGuildRepository implements GuildRepository {
  async findAll(): Promise<Array<Guild>> {
    try {
      const result = await GuildModel.find();
      return result;
    } catch (err) {
      return [];
    }
  }

  async findById(guildId: string): Promise<Guild | null> {
    try {
      const result = await GuildModel.findById(guildId);
      if (!result) return null;

      return result;
    } catch (err) {
      return null;
    }
  }

  async create<T>(guild: Guild): Promise<T | UnsuccessfullyOperation> {
    try {
      const result = await GuildModel.create(guild);
      return result as T;
    } catch (err) {
      return false;
    }
  }

  async update<T>(guild: Guild): Promise<T | UnsuccessfullyOperation> {
    try {
      const currentStored = await GuildModel.findById(guild?._id);

      const result = await GuildModel.updateOne(
        {
          _id: guild?._id,
        },
        {
        ...currentStored,
        ...guild,
      });
      
      return result as T;
    } catch {
      return false;
    }
  }

  async delete(guildId: string): Promise<any | UnsuccessfullyOperation> {
    try {
      const result = await GuildModel.deleteOne({
        _id: guildId,
      });
      return result;
    } catch (err) {
      return false;
    }
  }
}