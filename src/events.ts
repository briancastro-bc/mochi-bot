import { 
  Events, 
  Client, 
  Message, 
  ClientEvents,
  BaseInteraction,
} from 'discord.js';

import { container, } from '@ioc/di';

import { ClientReadyPort, } from '@application/ports/ClientReadyPort';
import { MessageCreatePort } from '@application/ports/MessageCreatePort';
import { InteractionCreatePort, } from '@application/ports/InteractionCreatePort';

export type Event = {
  name: keyof ClientEvents;
  once?: boolean;
  execute: (...args: Array<unknown>) => Promise<void>;
};

export const events = <Array<Event>>[
  {
    name: Events.ClientReady,
    once: true,
    async execute(client) {
      const useCase = container
        .resolve<ClientReadyPort>('ClientReady');
      await useCase.execute(client as Client);
    },
  },
  {
    name: Events.InteractionCreate,
    once: false,
    async execute(interaction) {
      const useCase = container
        .resolve<InteractionCreatePort>('InteractionCreate');
      await useCase.execute(interaction as BaseInteraction);
    },
  },
  {
    name: Events.MessageCreate,
    once: false,
    async execute(message) {
      const useCase = container
        .resolve<MessageCreatePort>('MessageCreate');
      await useCase.execute(message as Message);
    },
  },
];