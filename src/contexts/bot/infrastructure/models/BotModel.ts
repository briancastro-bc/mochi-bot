import database from '@db/client';

import { BotSchema, } from '@infrastructure/schemas/BotSchema';

const BotModel = database.model(
  'Bot', 
  BotSchema,
);

export { BotModel, };