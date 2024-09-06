import { model, } from 'mongoose';

import { GuildSchema, } from '@infrastructure/schemas/GuildSchema';

const GuildModel = model(
  'Guild', 
  GuildSchema,
);

export { GuildModel, };