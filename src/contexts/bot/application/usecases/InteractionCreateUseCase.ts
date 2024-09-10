import { 
  BaseInteraction,
} from 'discord.js';
import { t, } from 'i18next';

import { container, } from '@ioc/di';

import { WelcomeRepository, } from '@domain/repositories/WelcomeRepository';
import { InteractionCreatePort, } from '@application/ports/InteractionCreatePort';

export class InteractionCreateUseCase implements InteractionCreatePort {
  constructor(
    private readonly welcomeRepository: WelcomeRepository = container
      .resolve<WelcomeRepository>('WelcomeRepository'),
  ) {}

  async execute(interaction: BaseInteraction): Promise<void> {
    if (interaction.isModalSubmit()) {
      // if (interaction.customId === 'welcomeModal') return await this.handleSubmitWelcomeModal(interaction);
    }

    if (!interaction.isChatInputCommand()) return;

    const command = interaction.client.commands.get(interaction.commandName);

    if (!command) {
      await interaction.reply(t('commands.unknown'));
      return;
    }

    await command.execute(interaction);
  }
}
