import {
  Model,
  Schema,
} from 'mongoose';

import { Bot, } from '@domain/models/Bot';

const BotSchema = new Schema<Bot, Model<Bot>>(
  {
    _id: Schema.Types.String,
    nickname: Schema.Types.String,
    status: Schema.Types.String,
    prefix: {
      type: Schema.Types.String,
      default: '$',
    },
  },
  {
    _id: false,
    timestamps: true,
  },
);

export { BotSchema, };