import { Welcome, } from '@domain/models/Welcome';

export interface WelcomeRepository {
  findWelcomeById(channelId: string): Promise<Welcome | null>;
  findWelcomeByGuildId(guildId: string): Promise<Welcome| null>;
  createWelcome(welcome: Welcome): Promise<any>;
  updateWelcome(welcome: Welcome): Promise<any>;
  deleteWelcome(welcomeId: Welcome): Promise<any>;
  deleteWelcomeByGuildId(guildId: string): Promise<any>;
}