import { 
  Model, 
  Schema,
} from '@db/client';

import { Welcome, } from '@domain/models/Welcome';

const WelcomeSchema = new Schema<Welcome, Model<Welcome>>({
  guildId: { 
    type: Schema.Types.String,
    required: true,
    unique: true,
    index: true,
  },
  channelId: {
    type: Schema.Types.String,
    required: true,
    unique: true,
    index: true,
  },
  title: {
    type: Schema.Types.String,
    required: true,
    index: true,
  },
  authorName: {
    type: Schema.Types.String,
    required: true,
  },
  authorAvatarUrl: {
    type: Schema.Types.String,
    required: false,
  },
  roleId: {
    type: Schema.Types.String,
    required: false,
    unique: true,
  },
  thumbnail: {
    type: Schema.Types.String,
    required: false,
  },
  description: {
    type: Schema.Types.String,
    required: true,
  },
  footer: {
    type: Schema.Types.String,
    required: false,
  },
});

export {
  WelcomeSchema,
};