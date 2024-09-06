import { Guild, } from '@domain/models/Guild';
import { GuildRepository, } from '@domain/repositories/GuildRepository';

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

  async create(guild: Guild): Promise<any> {
    try {
      const result = await GuildModel.create(guild);
      return result;
    } catch (err) {
      return { success: false, };
    }
  }

  async update(guild: Guild): Promise<any> {
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
      
      return result;
    } catch {
      return { success: false, };
    }
  }

  async delete(guildId: string): Promise<any> {
    try {
      const result = await GuildModel.deleteOne({
        id: guildId,
      });
      return result;
    } catch (err) {
      return { success: false, };
    }
  }
}