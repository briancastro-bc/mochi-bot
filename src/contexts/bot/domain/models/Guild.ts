import { Bot, } from './Bot';
import { Model, } from './Model';
import { Welcome, } from './Welcome';

export interface Guild extends Model {
  icon: string;
  name: string;
  description: string | null;
  membersCount: number;
  ownerId: string;
  language?: string;
  available: boolean;
  banner: string | null;
  bot: Bot;
  welcome?: Welcome;
}