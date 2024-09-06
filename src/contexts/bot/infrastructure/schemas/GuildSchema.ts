import { 
  Model, 
  Schema,
} from '@db/client';

import { Guild, } from '@domain/models/Guild';

const GuildSchema = new Schema<Guild, Model<Guild>>(
  {
    _id: Schema.Types.String,
    icon: {
      type: Schema.Types.String,
      required: true,
    },
    name: {
      type: Schema.Types.String,
      required: true,
      index: true,
    },
    description: Schema.Types.String,
    membersCount: {
      type: Schema.Types.Number,
      default: 0,
    },
    ownerId: {
      type: Schema.Types.String,
      required: true,
    },
    language: {
      type: Schema.Types.String,
      default: 'es',
    },
    available: Schema.Types.Boolean,
    banner: Schema.Types.String,
    bot: {
      type: Schema.Types.String,
      ref: 'Bot',
    },
  },
  {
    _id: false,
    timestamps: true,
  },
);

export {
  GuildSchema,
};