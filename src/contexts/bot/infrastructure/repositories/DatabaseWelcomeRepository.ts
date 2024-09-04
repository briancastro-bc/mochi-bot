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

  async createWelcome(welcome: Welcome): Promise<any> {
    throw new Error('Method not implemented.');
  }

  async updateWelcome(welcome: Welcome): Promise<any> {
    throw new Error('Method not implemented.');
  }

  async deleteWelcome(welcomeId: Welcome): Promise<any> {
    throw new Error('Method not implemented.');
  }

  async deleteWelcomeByGuildId(guildId: string): Promise<any> {
    throw new Error('Method not implemented.');
  }
}