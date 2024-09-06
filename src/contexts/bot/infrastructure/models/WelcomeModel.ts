import { model, } from 'mongoose';

import { WelcomeSchema, } from '@infrastructure/schemas/WelcomeSchema';

const WelcomeModel = model(
  'Welcome',
  WelcomeSchema,
);

export { WelcomeModel, };