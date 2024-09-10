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

import { Database, } from '@shared/infrastructure/Database';
import { UsefulFunctionsRepositoryImplementation, } from '@shared/infrastructure/repositories/UsefulFunctionsRepositoryImplementation';

import { PingCommand, } from '@application/commands/PingCommand';
import { WelcomeCommand, } from '@application/commands/WelcomeCommand';

import { GuildCreateUseCase, } from '@application/usecases/GuildCreateUseCase';
import { GuildDeleteUseCase, } from '@application/usecases/GuildDeleteUseCase';
import { ClientReadyUseCase, } from '@application/usecases/ClientReadyUseCase';
import { MessageCreateUseCase, } from '@application/usecases/MessageCreateUseCase';
import { GuildMemberAddUseCase, } from '@application/usecases/GuildMemberAddUseCase';
import { ShardDisconnectUseCase, } from '@application/usecases/ShardDisconnectUseCase';
import { InteractionCreateUseCase, } from '@application/usecases/InteractionCreateUseCase';

import { DatabaseBotRepository, } from '@infrastructure/repositories/DatabaseBotRepository';
import { DatabaseGuildRepository, } from '@infrastructure/repositories/DatabaseGuildRepository';
import { DatabaseWelcomeRepository, } from '@infrastructure/repositories/DatabaseWelcomeRepository';

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
    token: 'mongo_uri',
    provider: {
      useValue: process.env.MONGO_URI!,
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
    token: 'DatabaseConnection',
    provider: {
      useClass: Database,
    },
    type: 'ClassProvider',
    options: {
      lifecycle: Lifecycle.Singleton,
    },
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
    token: 'ShardDisconnect',
    provider: {
      useClass: ShardDisconnectUseCase,
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