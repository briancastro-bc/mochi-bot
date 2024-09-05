import { 
  BaseInteraction,
  ModalSubmitInteraction, 
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

  private async handleSubmitWelcomeModal(interaction: ModalSubmitInteraction): Promise<void> {
    const inputsFields = [
      'title', 
      'authorName', 
      'authorAvatar', 
      'description', 
      'footer'
    ];

    const fields = Object
      .values(inputsFields)
      .map(v => interaction.fields.getTextInputValue(v));

    const [
      title,
      authorName,
      authorAvatar,
      description,
      footer,
    ] = fields;

    console.log('interaction', interaction);
    console.log('fields', fields);

    // const savedNewWelcome = await this.welcomeRepository.createWelcome({
    //   guildId: interaction.guild?.id!,
    //   channelId: interaction.
    // });

    await interaction.reply({
      content: 'Submission received successfully',
    });
  }
}
