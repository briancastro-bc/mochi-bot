import { Model, } from './Model';

export enum VerificationType {
  TEXT,
  MESSAGE,
  REACTION,
}

export interface Verification extends Model {
  channelId: string;
  type: VerificationType;
  roles: Array<string>;
}