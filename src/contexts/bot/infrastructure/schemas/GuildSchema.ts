import { 
  Model, 
  Schema,
} from '@db/client';

import { Guild, } from '@domain/models/Guild';

const GuildSchema = new Schema<Guild, Model<Guild>>(
  {
    id: { 
      type: Schema.Types.String,
      required: true,
      unique: true,
      index: true,
    },
    icon: {
      type: Schema.Types.String,
      required: true,
    },
    name: {
      type: Schema.Types.String,
      required: true,
      index: true,
    },
    membersCount: {
      type: Schema.Types.Number,
      default: 0,
    },
    botNickname: {
      type: Schema.Types.String,
      required: false,
    },
    botStatus: {
      type: Schema.Types.String,
      required: false,
    },
    botId: {
      type: Schema.Types.String,
      required: true,
    }
  },
  {
    timestamps: true,
  }
);

export {
  GuildSchema,
};