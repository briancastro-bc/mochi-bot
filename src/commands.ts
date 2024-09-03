import { 
  Message,
  Interaction, 
  SlashCommandBuilder, 
  ApplicationCommandType,
  MessageType,
} from 'discord.js';

import { container, } from '@ioc/di';

import { InteractionCreatePort, } from '@application/ports/InteractionCreatePort';

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
      if (interaction.isCommand && interaction.isCommand()) {
        console.log('interaction commmand');
      }

      if (interaction.isChatInputCommand && interaction.isChatInputCommand()) {
        console.log('interaction chat input');
      }

      if (interaction.type === MessageType.Default) {
        console.log('interaction message');
      }

      console.log('interaction', interaction);
      await interaction.reply('Pong!');
      // const useCase = container
      //   .resolve<InteractionCreatePort>('InteractionCreate');
      // await useCase.execute(interaction);
    },
  },
];