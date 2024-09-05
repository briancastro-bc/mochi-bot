import { 
  ModalBuilder, 
  ChannelType,
  TextInputBuilder,
  TextInputStyle,
  ActionRowBuilder,
  ChatInputCommandInteraction,
  ModalActionRowComponentBuilder,
  ModalSubmitInteraction,
  Channel,
  TextChannel, 
} from 'discord.js';
import { t, } from 'i18next';

import { container, } from '@ioc/di';

import { CommandHandler, } from '@shared/domain/CommandHandler';
import { WelcomeRepository, } from '@domain/repositories/WelcomeRepository';

export class WelcomeCommand implements CommandHandler {
  constructor(
    private readonly welcomeRepository: WelcomeRepository = container
      .resolve<WelcomeRepository>('WelcomeRepository'),
  ) {}

  async handle(interaction: ChatInputCommandInteraction): Promise<void> {
    if (!interaction.memberPermissions?.has('Administrator')) {
      await interaction.reply({
        ephemeral: true,
        content: 'No tienes permisos para usar este comando',
      });

      return;
    }

    const channel = interaction.options.getChannel('channel');

    if (channel?.type !== ChannelType.GuildText) {
      await interaction.reply({
        content: 'El canal que has seleccionado no es de texto',
      });

      return;
    };

    const currentWelcomeChannel = await this.welcomeRepository.findWelcomeByGuildId(interaction?.guild?.id!);
    if (currentWelcomeChannel) {
      await interaction.reply({
        content: 'El servidor ya tiene un canal de bienvenida establecido',
      });

      return;
    }

    const welcomeModal = await this.createWelcomeModal();

    await interaction.showModal(welcomeModal);

    const response = await interaction.awaitModalSubmit({
      time: 60_000 * 5,
      filter: (interaction: ModalSubmitInteraction) => interaction.customId === 'welcomeModal',
    });

    await this.handleSubmitWelcomeModal(response, channel as TextChannel);
  }

  private async handleSubmitWelcomeModal(
    interaction: ModalSubmitInteraction, 
    targetChannel: TextChannel
  ): Promise<void> {
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

    const savedNewWelcome = await this.welcomeRepository.createWelcome({
      guildId: interaction.guild?.id!,
      channelId: targetChannel.id,
      title: title!,
      authorName: authorName!,
      authorAvatarUrl: authorAvatar!,
      mentionUser: false,
      description: description!,
      ...(footer && {
        footer,
      }),
    });

    console.log('savedNewWelcome', savedNewWelcome);

    if (!savedNewWelcome) {
      await interaction.reply({
        ephemeral: true,
        content: 'Algo salio mal, no pudimos crear la bienvenida.',
      });

      return;
    }

    await interaction.reply({
      content: 'Se ha creado el canal de bienvenida!',
    });
  }

  private async createWelcomeModal(): Promise<ModalBuilder> {
    const modal = new ModalBuilder()
      .setCustomId('welcomeModal')
      .setTitle(t('welcome.title'));
    
    const titleInput = new TextInputBuilder()
      .setCustomId('title')
      .setLabel(`${t('welcome.titleInput')}`)
      .setPlaceholder(t('welcome.titlePlaceholder'))
      .setStyle(TextInputStyle.Short)
      .setRequired(true);
    
    const authorNameInput = new TextInputBuilder()
      .setCustomId('authorName')
      .setLabel(t('welcome.authorNameInput'))
      .setPlaceholder(t('welcome.authorNamePlaceholder'))
      .setStyle(TextInputStyle.Short)
      .setRequired(true);
    
    const authorAvatarUrlInput = new TextInputBuilder()
      .setCustomId('authorAvatar')
      .setLabel(t('welcome.authorAvatarUrlInput'))
      .setPlaceholder(t('welcome.authorAvatarUrlPlaceholder'))
      .setStyle(TextInputStyle.Short)

    const descriptionInput = new TextInputBuilder()
      .setCustomId('description')
      .setLabel(t('welcome.descriptionInput'))
      .setStyle(TextInputStyle.Paragraph)
      .setRequired(true);
    
    const footerInput = new TextInputBuilder()
      .setCustomId('footer')
      .setLabel(t('welcome.footerInput'))
      .setStyle(TextInputStyle.Short);

    const titleActionRow = new ActionRowBuilder<ModalActionRowComponentBuilder>()
      .addComponents(titleInput);
    const authorNameActionRow = new ActionRowBuilder<ModalActionRowComponentBuilder>()
      .addComponents(authorNameInput);
    const authorAvatarUrlActionRow = new ActionRowBuilder<ModalActionRowComponentBuilder>()
      .addComponents(authorAvatarUrlInput);
    const descriptionActionRow = new ActionRowBuilder<ModalActionRowComponentBuilder>()
      .addComponents(descriptionInput);
    const footerActionRow = new ActionRowBuilder<ModalActionRowComponentBuilder>()
      .addComponents(footerInput);
    
    modal.addComponents(
      titleActionRow,
      authorNameActionRow,
      authorAvatarUrlActionRow,
      descriptionActionRow,
      footerActionRow,
    );

    return modal;
  }
}