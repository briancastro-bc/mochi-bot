import { Welcome, } from '@domain/models/Welcome';
import { WelcomeRepository, } from '@domain/repositories/WelcomeRepository';

import { WelcomeModel, } from '@infrastructure/models/WelcomeModel';

export class DatabaseWelcomeRepository implements WelcomeRepository {
  async findWelcomeById(channelId: string): Promise<Welcome | null> {
    try {
      const result = await WelcomeModel.findOne({
        channelId,
      });
      return result;
    } catch (err) {
      return null;
    }
  }

  async findWelcomeByGuildId(guildId: string): Promise<Welcome | null> {
    try {
      const result = await WelcomeModel.findOne({
        guildId,
      });
      return result;
    } catch (err) {
      return null;
    }
  }

  async create(welcome: Welcome): Promise<any> {
    try {
      const result = await WelcomeModel.create({
        ...welcome,
      });

      return result;
    } catch (err) {
      console.error(err);
      return null;
    }
  }

  async update(welcome: Welcome): Promise<any> {
    throw new Error('Method not implemented.');
  }

  async delete(welcomeId: Welcome): Promise<any> {
    throw new Error('Method not implemented.');
  }

  async deleteGuildId(guildId: string): Promise<any> {
    throw new Error('Method not implemented.');
  }
}