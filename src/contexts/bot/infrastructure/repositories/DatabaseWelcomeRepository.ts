import { Welcome, } from '@domain/models/Welcome';
import { WelcomeRepository, } from '@domain/repositories/WelcomeRepository';
import { UnsuccessfullyOperation, } from '@domain/types/UnsuccesfullyOperation';

import { WelcomeModel, } from '@infrastructure/models/WelcomeModel';
import { escapeInlineCode } from 'discord.js';

export class DatabaseWelcomeRepository implements WelcomeRepository {
  async findWelcomeById(id: string): Promise<Welcome | null> {
    try {
      const result = await WelcomeModel.findById(id);

      return result;
    } catch (err) {
      return null;
    }
  }

  async create<T>(welcome: Welcome): Promise<T | UnsuccessfullyOperation> {
    try {
      const result = await WelcomeModel.create({
        ...welcome,
      });

      return result as T;
    } catch (err) {
      return false;
    }
  }

  async createOrUpdate<T>(welcome: Welcome): Promise<T | UnsuccessfullyOperation> {
    try {
      return await WelcomeModel.updateOne(
        {
          _id: welcome?._id,
        },
        {
          ...welcome,
        },
        {
          upsert: true,
        }
      ) as T;
    } catch (err) {
      console.log('err', err);

      return false;
    }
  }

  async update<T>(welcome: Welcome): Promise<T | UnsuccessfullyOperation> {
    throw new Error('Method not implemented.');
  }

  async delete(welcomeId: Welcome): Promise<any | UnsuccessfullyOperation> {
    throw new Error('Method not implemented.');
  }

  async deleteByGuildId(guildId: string): Promise<any | UnsuccessfullyOperation> {
    throw new Error('Method not implemented.');
  }
}