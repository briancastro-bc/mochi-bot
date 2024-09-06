import { 
  Events, 
  Client, 
  Message, 
  GuildMember,
  ClientEvents,
  BaseInteraction,
  Guild,
} from 'discord.js';

import { container, } from '@ioc/di';

import { GuildCreatePort, } from '@application/ports/GuildCreatePort';
import { GuildDeletePort, } from '@application/ports/GuildDeletePort';
import { ClientReadyPort, } from '@application/ports/ClientReadyPort';
import { MessageCreatePort } from '@application/ports/MessageCreatePort';
import { GuildMemberAddPort } from '@application/ports/GuildMemberAddPort';
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
    name: Events.GuildCreate,
    once: false,
    async execute(guild) {
      const useCase = container
        .resolve<GuildCreatePort>('GuildCreate');
      await useCase.execute(guild as Guild);
    },
  },
  {
    name: Events.GuildUpdate,
    once: false,
    async execute(guild) {
      // TODO:
    },
  },
  {
    name: Events.GuildDelete,
    once: false,
    async execute(guild) {
      const useCase = container
        .resolve<GuildDeletePort>('GuildDelete');
      await useCase.execute(guild as Guild);
    },
  },
  {
    name: Events.TypingStart,
    once: false,
    async execute(channel, user) {
      // TODO:
    },
  },
  {
    name: Events.GuildMemberAdd,
    once: false,
    async execute(member) {
      const useCase = container
        .resolve<GuildMemberAddPort>('GuildMemberAdd');
      await useCase.execute(member as GuildMember);
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