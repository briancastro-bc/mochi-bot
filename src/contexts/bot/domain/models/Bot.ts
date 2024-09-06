import { Model, } from './Model';

export interface Bot extends Model {
  nickname?: string;
  status?: string;
  prefix?: string;
}