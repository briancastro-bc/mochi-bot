import { Welcome, } from '@domain/models/Welcome';
import { UnsuccessfullyOperation, } from '@domain/types/UnsuccesfullyOperation';

export interface WelcomeRepository {
  findWelcomeById(channelId: string): Promise<Welcome | null>;
  create<T>(welcome: Welcome): Promise<T | UnsuccessfullyOperation>;
  update<T>(welcome: Welcome): Promise<T | UnsuccessfullyOperation>;
  delete(welcomeId: Welcome): Promise<any | UnsuccessfullyOperation>;
  deleteByGuildId(guildId: string): Promise<any | UnsuccessfullyOperation>;
}