import { ChatInputCommandInteraction, } from 'discord.js';

import { CommandHandler, } from '@shared/domain/CommandHandler';

export class VerificationCommand implements CommandHandler {
  constructor(

  ) {}

  handle(interaction: ChatInputCommandInteraction): Promise<void> {
    throw new Error('Method not implemented.');
  }
}