import { model, } from 'mongoose';

import { BotSchema, } from '@infrastructure/schemas/BotSchema';

const BotModel = model(
  'Bot', 
  BotSchema,
);

export { BotModel, };