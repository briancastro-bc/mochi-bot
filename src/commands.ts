import { 
  Interaction, 
  SlashCommandBuilder, 
} from 'discord.js';

import { container, } from '@ioc/di';

import { CommandHandler, } from '@shared/domain/CommandHandler';

export type Command = {
  data: SlashCommandBuilder;
  execute: (interaction: Interaction) => Promise<void>;
};

export const commands = <Array<Command>>[
  {
    data: new SlashCommandBuilder()
      .setName('ping')
      .setDescription('Check bot availability'),
    async execute (interaction) {
      const commandHandler = container.resolve<CommandHandler>('PingCommand');
      await commandHandler.handle(interaction);
    },
  },
  {
    data: new SlashCommandBuilder()
      .setName('verification')
      .setDescription('Crear canal de verificacion')
      .addChannelOption(
        option => option
          .setName('channel')
          .setDescription('Canal donde se creara la verificacion')
          .setRequired(true),
      ),
    async execute(interaction) {
      if (!interaction.isRepliable()) return;

      console.log('interaction', interaction);
    },
  },
  {
    data: new SlashCommandBuilder()
      .setName('welcome')
      .setDescription('Crear canal de bienvenida')
      .addChannelOption(
        option => option
          .setName('channel')
          .setDescription('Canal donde se creará la bienvenida')
          .setRequired(true),
      ),
    async execute(interaction) {
      const commandHandler = container.resolve<CommandHandler>('WelcomeCommand');
      await commandHandler.handle(interaction);
    }
  }
];