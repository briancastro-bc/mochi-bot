import { 
  ChannelType,
  TextChannel, 
  ButtonStyle,
  EmbedBuilder,
  ModalBuilder, 
  ButtonBuilder,
  TextInputStyle,
  TextInputBuilder,
  ActionRowBuilder,
  ButtonInteraction,
  ModalSubmitInteraction,
  ChatInputCommandInteraction,
  ModalActionRowComponentBuilder,
} from 'discord.js';
import { t, } from 'i18next';

import { container, } from '@ioc/di';

import { CommandHandler, } from '@shared/domain/CommandHandler';

import { Welcome, } from '@domain/models/Welcome';
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
        content: t('commands.notPermissions'),
      });

      return;
    }

    const channel = interaction.options.getChannel('channel');

    if (channel?.type !== ChannelType.GuildText) {
      await interaction.reply({
        content: t('welcome.errors.notTextChannel'),
      });

      return;
    };

    const awaitModalSubmit = async (i: ButtonInteraction | ChatInputCommandInteraction) => {
      const modalSubmitResponse = await i.awaitModalSubmit({
        time: 60_000 * 5,
        filter: (submitInteraction: ModalSubmitInteraction) => submitInteraction?.customId === 'welcomeModal',
      });

      return modalSubmitResponse;
    }

    const currentWelcomeChannel = await this.welcomeRepository.findWelcomeById(interaction?.guild?.id!);

    const welcomeModal = this.buildWelcomeModal(currentWelcomeChannel);

    if (currentWelcomeChannel) {
      const embedMessage = new EmbedBuilder()
        .setTitle('Oops! Ya hay un canal de bienvenida creado')
        .setDescription('A continuacion, te mostramos los datos del canal de bienvenida actual')
        .setFields(
          {
            name: 'Titulo',
            value: currentWelcomeChannel?.title ?? 'N/A',
            inline: true,
          },
          {
            name: 'Id del canal',
            value: currentWelcomeChannel?.channelId ?? 'N/A',
            inline: true,
          },
          {
            name: 'Autor',
            value: currentWelcomeChannel?.authorName ?? 'N/A',
            inline: true,
          },
        );

      const row = this.buildConfirmAndCancelBtns();

      const response = await interaction.reply({
        embeds: [embedMessage,],
        components: [row,],
      });
      
      try {
        const confirmation = await response.awaitMessageComponent<2>({
          time: 120_000,
          filter: (i: ButtonInteraction) => i.customId === 'update',
        });

        await confirmation.showModal(welcomeModal);

        const modalResponse = await awaitModalSubmit(confirmation);

        await this.submitWelcomeModal(modalResponse, channel.id);
      } catch (err) {
        await interaction.editReply({
          content: 'No recibimos una respuesta',
          components: [],
        });
      }
    } else {
      await interaction.showModal(welcomeModal);
  
      const modalResponse = await awaitModalSubmit(interaction);
  
      await this.submitWelcomeModal(modalResponse, channel.id);
    }
  }

  private async submitWelcomeModal(
    interaction: ModalSubmitInteraction,
    targetChannelId: string,
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

    const targetChannel = await interaction.guild?.channels.fetch(targetChannelId);

    const savedNewWelcome = await this.welcomeRepository.createOrUpdate<Welcome>({
      _id: interaction.guild?.id!,
      channelId: targetChannel?.id!,
      title: title!,
      authorName: authorName!,
      authorAvatarUrl: authorAvatar!,
      mentionUser: false,
      description: description!,
      ...(footer && {
        footer,
      }),
    });

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

  private buildConfirmAndCancelBtns(): ActionRowBuilder<ButtonBuilder> {
    const update = new ButtonBuilder()
      .setCustomId('update')
      .setLabel('Actualizar')
      .setStyle(ButtonStyle.Primary);
    
    const cancel = new ButtonBuilder()
      .setCustomId('cancel')
      .setLabel('Cancelar')
      .setStyle(ButtonStyle.Secondary);
    
    return new ActionRowBuilder<ButtonBuilder>()
      .addComponents(cancel, update);
  }

  private buildWelcomeModal(data?: Welcome | null): ModalBuilder {
    const modal = new ModalBuilder()
      .setCustomId('welcomeModal')
      .setTitle(t('welcome.title'));
    
    const titleInput = new TextInputBuilder({
      ...(data?.title && {
        value: data?.title,
      }),
    })
      .setCustomId('title')
      .setLabel(`${t('welcome.titleInput')}`)
      .setPlaceholder(t('welcome.titlePlaceholder'))
      .setStyle(TextInputStyle.Short)
      .setRequired(true);
    
    const authorNameInput = new TextInputBuilder({
      ...(data?.authorName && {
        value: data?.authorName,
      }),
    })
      .setCustomId('authorName')
      .setLabel(t('welcome.authorNameInput'))
      .setPlaceholder(t('welcome.authorNamePlaceholder'))
      .setStyle(TextInputStyle.Short)
      .setRequired(true);
    
    const authorAvatarUrlInput = new TextInputBuilder({
      ...(data?.authorAvatarUrl && {
        value: data?.authorAvatarUrl,
      }),
    })
      .setCustomId('authorAvatar')
      .setLabel(t('welcome.authorAvatarUrlInput'))
      .setPlaceholder(t('welcome.authorAvatarUrlPlaceholder'))
      .setStyle(TextInputStyle.Short)

    const descriptionInput = new TextInputBuilder({
      ...(data?.description && {
        value: data?.description,
      }),
    })
      .setCustomId('description')
      .setLabel(t('welcome.descriptionInput'))
      .setStyle(TextInputStyle.Paragraph)
      .setRequired(true);
    
    const footerInput = new TextInputBuilder({
      ...(data?.footer && {
        value: data?.footer,
      }),
    })
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