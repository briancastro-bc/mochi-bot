import { 
  Model, 
  Schema,
} from 'mongoose';

import { Welcome, } from '@domain/models/Welcome';

const WelcomeSchema = new Schema<Welcome, Model<Welcome>>(
  {
    _id: Schema.Types.String,
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
    color: Schema.Types.Number,
    authorName: {
      type: Schema.Types.String,
      required: true,
    },
    mentionUser: {
      type: Schema.Types.Boolean,
      default: true,
    },
    authorAvatarUrl: Schema.Types.String,
    roles: [Schema.Types.String],
    description: {
      type: Schema.Types.String,
      required: true,
    },
    footer: Schema.Types.String,
  },
  {
    _id: false,
    timestamps: true,
  }
);

export {
  WelcomeSchema,
};