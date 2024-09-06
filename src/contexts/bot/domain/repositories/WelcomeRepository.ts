import { Welcome, } from '@domain/models/Welcome';

export interface WelcomeRepository {
  findWelcomeById(channelId: string): Promise<Welcome | null>;
  findWelcomeByGuildId(guildId: string): Promise<Welcome| null>;
  create(welcome: Welcome): Promise<any>;
  update(welcome: Welcome): Promise<any>;
  delete(welcomeId: Welcome): Promise<any>;
  deleteGuildId(guildId: string): Promise<any>;
}