import {
  userMention,
  GuildMember, 
  EmbedBuilder,
  HexColorString, 
} from 'discord.js';
import { t, } from 'i18next';

import { container, } from '@ioc/di';

import { GuildMemberAddPort, } from '@application/ports/GuildMemberAddPort';
import { WelcomeRepository, } from '@domain/repositories/WelcomeRepository';

export class GuildMemberAddUseCase implements GuildMemberAddPort {
  constructor(
    private readonly welcomeRepository: WelcomeRepository = container
      .resolve<WelcomeRepository>('WelcomeRepository'),
  ) {}

  async execute(member: GuildMember): Promise<void> {
    if (member?.user?.bot) return;

    const guildWelcomeChannel = await this.welcomeRepository
      .findWelcomeByGuildId(member.guild?.id);
    
    if (!guildWelcomeChannel) return;

    const {
      title,
      color,
      authorName,
      mentionUser,
      authorAvatarUrl,
      rolesIds,
      description,
      footer,
      channelId,
    } = guildWelcomeChannel;

    const welcomeChannel = member?.guild?.channels?.cache?.get(channelId!) 
      ?? await member?.guild?.channels?.fetch(channelId!);

    if (!welcomeChannel) return;

    const bot = await member.guild.members?.fetch(
      container.resolve<string>('application_id')!
    );

    const welcomeMessage = new EmbedBuilder()
      .setColor(color ?? 'Random')
      .setAuthor({
        name: authorName ?? t('common.welcome'),
        // TODO: validate avatar url when create welcome.
        // iconURL: authorAvatarUrl ?? bot.displayAvatarURL()!,
        iconURL: bot.displayAvatarURL()!,
      })
      .setTitle(title)
      .setThumbnail(member.displayAvatarURL())
      .setDescription(
        description
          .replace('@mention@', mentionUser 
            ? userMention(member.id) 
            : member?.displayName
          )
      );
    
    if (footer) welcomeMessage.setFooter({ text: footer, });

    if (rolesIds && rolesIds?.length > 0) await member?.roles?.add(rolesIds);
    
    if (!welcomeChannel.isTextBased()) return;

    await welcomeChannel
      .send({
        target: member,
        embeds: [welcomeMessage,],
      });
  }
}