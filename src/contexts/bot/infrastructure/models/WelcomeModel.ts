import database from '@db/client';

import { WelcomeSchema, } from '@infrastructure/schemas/WelcomeSchema';

const WelcomeModel = database.model(
  'Welcome',
  WelcomeSchema,
);

export { WelcomeModel, };