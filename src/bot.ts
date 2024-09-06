import 'dotenv/config';
import 'reflect-metadata';

import {
  REST, 
  Routes,
  Client,
  Collection, 
  GatewayIntentBits,
} from 'discord.js';

import { container, } from '@ioc/di';

import { events, } from '@src/events';
import { commands, } from '@src/commands';

const token = container.resolve<string>('token');
const application_id = container.resolve<string>('application_id');

const rest = new REST().setToken(token);

async function start(): Promise<Client> {
  const client = new Client({
    intents: [
      GatewayIntentBits.Guilds,
      GatewayIntentBits.GuildMembers,
      GatewayIntentBits.GuildMessages,
      GatewayIntentBits.GuildModeration,
      GatewayIntentBits.GuildMessageTyping,
      GatewayIntentBits.MessageContent,
      GatewayIntentBits.DirectMessages,
      GatewayIntentBits.DirectMessageTyping,
      GatewayIntentBits.AutoModerationConfiguration,
      GatewayIntentBits.AutoModerationExecution,
    ],
  }) as Client;

  return client;
}

async function handleEvents(client: Client): Promise<Client> {
  for (const event of events) {
    if (event.once) client.once(event.name, (...args) => event.execute(...args));
    else client.on(event.name, (...args) => event.execute(...args));
  }

  return client;
}

async function handleCommands(client: Client): Promise<Client> {
  client.commands = new Collection();

  for (const command of commands) {
    if ('data' in command && 'execute' in command)
      client.commands.set(command.data.name, command);
  }

  const applicationCommands = Object
    .values(commands)
    .map(command => command.data.toJSON()) as Array<unknown>;

  await rest.put(
    Routes.applicationCommands(application_id),
    { body: applicationCommands, },
  );

  return client;
}

start()
  .then(handleEvents)
  .then(handleCommands)
  .then(c => c.login(token))
  .catch((err) => {
    console.log(err);
    process.exit(1)
  });
