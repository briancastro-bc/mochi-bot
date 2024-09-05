import { ChatInputCommandInteraction, } from 'discord.js';

import { CommandHandler, } from '@shared/domain/CommandHandler';

export class PingCommand implements CommandHandler {
  constructor() {}

  async handle(interaction: ChatInputCommandInteraction): Promise<void> {
    await interaction.deferReply();

    await interaction
      .followUp({
        content: `Pong! | Ping: ${interaction.client.ws.ping}ms`,
      });
  }
}