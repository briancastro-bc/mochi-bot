import database from '@db/client';

import { GuildSchema, } from '@infrastructure/schemas/GuildSchema';

const GuildModel = database.model(
  'Guild', 
  GuildSchema,
);

export { GuildModel, };