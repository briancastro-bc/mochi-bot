import { Model, } from './Model';

export interface Welcome extends Model {
  channelId: string;
  title: string;
  color?: number;
  authorName: string;
  mentionUser: boolean;
  authorAvatarUrl?: string;
  rolesIds?: Array<string>; 
  description: string;
  footer?: string;
}