import { Bot, } from './Bot';
import { Model, } from './Model';

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
}