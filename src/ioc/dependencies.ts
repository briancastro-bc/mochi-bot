import { 
  container, 
  Provider, 
  Lifecycle,
  InjectionToken, 
  RegistrationOptions,
  TokenProvider,
  ValueProvider,
  FactoryProvider,
  ClassProvider, 
} from 'tsyringe';
import { constructor, } from 'tsyringe/dist/typings/types';

import { PingCommand, } from '@application/commands/PingCommand';
import { WelcomeCommand, } from '@application/commands/WelcomeCommand';

import { GuildCreateUseCase, } from '@application/GuildCreateUseCase';
import { GuildDeleteUseCase, } from '@application/GuildDeleteUseCase';
import { ClientReadyUseCase, } from '@application/ClientReadyUseCase';
import { MessageCreateUseCase, } from '@application/MessageCreateUseCase';
import { GuildMemberAddUseCase, } from '@application/GuildMemberAddUseCase';
import { InteractionCreateUseCase, } from '@application/InteractionCreateUseCase';

import { DatabaseBotRepository, } from '@infrastructure/repositories/DatabaseBotRepository';
import { DatabaseGuildRepository, } from '@infrastructure/repositories/DatabaseGuildRepository';
import { DatabaseWelcomeRepository, } from '@infrastructure/repositories/DatabaseWelcomeRepository';

import { UsefulFunctionsRepositoryImplementation, } from '@shared/infrastructure/repositories/UsefulFunctionsRepositoryImplementation';

export type InjectableType = 'constructor' 
| 'ValueProvider' 
| 'FactoryProvider' 
| 'TokenProvider' 
| 'ClassProvider';

export type Injectable = {
  token: InjectionToken;
  provider: Provider | constructor<any>;
  type: InjectableType;
  options?: RegistrationOptions;
};

const dependencies: Array<Injectable> = [
  {
    token: 'token',
    provider: {
      useValue: process.env.DISCORD_BOT_TOKEN!,
    },
    type: 'ValueProvider',
  },
  {
    token: 'prefix',
    provider: {
      useValue: process.env.DISCORD_BOT_PREFIX,
    },
    type: 'ValueProvider',
  },
  {
    token: 'server_id',
    provider: {
      useValue: process.env.DISCORD_SERVER_ID!,
    },
    type: 'ValueProvider',
  },
  {
    token: 'application_id',
    provider: {
      useValue: process.env.DISCORD_APPLICATION_ID!,
    },
    type: 'ValueProvider',
  },
  {
    token: 'verification_channel_id',
    provider: {
      useValue: process.env.DISCORD_VERIFICATION_CHANNEL_ID,
    },
    type: 'ValueProvider',
  },
  {
    token: 'verification_role_id',
    provider: {
      useValue: process.env.DISCORD_VERIFICATION_ROLE_ID,
    },
    type: 'ValueProvider',
  },
  {
    token: 'GuildRepository',
    provider: {
      useClass: DatabaseGuildRepository,
    },
    type: 'ClassProvider',
    options: {
      lifecycle: Lifecycle.Singleton,
    },
  },
  {
    token: 'WelcomeRepository',
    provider: {
      useClass: DatabaseWelcomeRepository,
    },
    type: 'ClassProvider',
    options: {
      lifecycle: Lifecycle.Singleton,
    },
  },
  {
    token: 'BotRepository',
    provider: {
      useClass: DatabaseBotRepository,
    },
    type: 'ClassProvider',
    options: {
      lifecycle: Lifecycle.Singleton,
    },
  },
  {
    token: 'PingCommand',
    provider: {
      useClass: PingCommand,
    },
    type: 'ClassProvider',
  },
  {
    token: 'WelcomeCommand',
    provider: {
      useClass: WelcomeCommand,
    },
    type: 'ClassProvider',
  },
  {
    token: 'ClientReady',
    provider: {
      useClass: ClientReadyUseCase,
    },
    type: 'ClassProvider',
  },
  {
    token: 'InteractionCreate',
    provider: {
      useClass: InteractionCreateUseCase,
    },
    type: 'ClassProvider',
  },
  {
    token: 'MessageCreate',
    provider: {
      useClass: MessageCreateUseCase,
    },
    type: 'ClassProvider',
  },
  {
    token: 'GuildMemberAdd',
    provider: {
      useClass: GuildMemberAddUseCase,
    },
    type: 'ClassProvider',
  },
  {
    token: 'GuildCreate',
    provider: {
      useClass: GuildCreateUseCase,
    },
    type: 'ClassProvider',
  },
  {
    token: 'GuildDelete',
    provider: {
      useClass: GuildDeleteUseCase,
    },
    type: 'ClassProvider',
  },
  {
    token: 'UsefulRepository',
    provider: {
      useClass: UsefulFunctionsRepositoryImplementation,
    },
    type: 'ClassProvider',
  },
];

function registerDependency(dependency: Injectable): void {
  const actions: {
    [K in InjectableType]: () => void
  } = {
    'constructor': () => container
      .register<any>(dependency.token, dependency.provider as constructor<any>, dependency.options),
    'ValueProvider': () => container
      .register<any>(dependency.token, dependency.provider as ValueProvider<any>),
    'FactoryProvider': () => container
      .register<any>(dependency.token, dependency.provider as FactoryProvider<any>),
    'TokenProvider': () => container
      .register<any>(dependency.token, dependency.provider as TokenProvider<any>, dependency.options),
    'ClassProvider': () => container
      .register<any>(dependency.token, dependency.provider as ClassProvider<any>, dependency.options),
  };

  actions[dependency.type]();
}

for (const dependency of dependencies) {
  registerDependency(dependency);
}