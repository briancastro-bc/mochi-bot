import { Interaction, SlashCommandBuilder, } from 'discord.js';

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
      if (!interaction.isRepliable()) return;

      await interaction.reply('Pong!');
    },
  },
];