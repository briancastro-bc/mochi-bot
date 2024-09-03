import {
  userMention,
  GuildMember, 
  EmbedBuilder, 
} from 'discord.js';

import { container, } from '@ioc/di';

import { GuildMemberAddPort, } from '@application/ports/GuildMemberAddPort';

export class GuildMemberAddUseCase implements GuildMemberAddPort {
  async execute(member: GuildMember): Promise<void> {
    const welcome_channel_id = container
      .resolve<string>('welcome_channel_id');

    if (member?.user?.bot) return;

    const welcomeChannel = await member?.guild?.channels?.fetch(welcome_channel_id);
    if (!welcomeChannel) return;

    const bot_id = container
      .resolve<string>('application_id');

    const bot = await member.guild.members?.fetch(bot_id!);

    const welcomeMessage = new EmbedBuilder()
      .setColor(0xcc0000)
      .setAuthor({
        name: 'Cable News Network',
        iconURL: bot.displayAvatarURL()!,
      })
      .setTitle('¡Gracias por registrarte!')
      .setThumbnail(member.displayAvatarURL())
      .setDescription(`
        Hola, ${userMention(member.id)}! 🎉 
        Nos alegra que te unas a nuestro **sitio web oficial**. 
        Aquí, serás parte de la red de noticias más dinámica y veraz del país.
      `)
      .setFooter({
        text: `cnn@gtalegacy.net`
      });
    
    if (!welcomeChannel.isTextBased()) return;

    await welcomeChannel
      .send({
        target: member,
        embeds: [welcomeMessage,],
      });
  }
}