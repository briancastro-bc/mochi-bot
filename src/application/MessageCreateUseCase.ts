import { 
  Message, 
  EmbedBuilder, 
} from 'discord.js';

import { container, } from '@ioc/di';

import { MessageCreatePort, } from '@application/ports/MessageCreatePort';

export class MessageCreateUseCase implements MessageCreatePort {

  async execute(message: Message): Promise<void> {
    if (message?.author?.bot || message?.system) return;


    const verification_channel_id = container
      .resolve<string>('verification_channel_id');

    const targetChannel = message.channelId;
    if (targetChannel !== verification_channel_id) return;

    const content = message?.content;

    const newUserNickname = this.transformValidUsername(content);
    if (!newUserNickname) {
      const embedMessage = new EmbedBuilder()
        .setTitle('Formato incorrecto')
        .setDescription(`
          Recuerda que para un formato válido,
          debes utilizar la convención **Nombre_Apellido**. De lo contrario
          no podremos verificar tú nombre.
        `)
        .setColor('Random')
        .setAuthor({
          name: 'Validador',
        });
     
      await message
        .author
        .send({
          embeds: [embedMessage,],
        });
      if (message.deletable) await message.delete();
      return;
    }

    try {
      const verification_role_id = container
        .resolve<string>('verification_role_id');

      const duplicatedNicknameMember = message.guild?.members?.cache
        ?.find(m => m.nickname === newUserNickname);
      if (duplicatedNicknameMember?.nickname === newUserNickname) {
        const embedMessage = new EmbedBuilder()
          .setTitle('Oops!')
          .setDescription(`Actualmente ya hay un usuario con el nombre que has seleccionado`);
        
        await message
          .author
          .send({
            target: message.author,
            embeds: [embedMessage,],
            allowedMentions: {
              users: [message.author?.id,],
            },
          });
        if (message?.deletable) await message.delete()
        return;
      }
  
      if (!message?.guild?.members?.me?.permissions?.has('ManageNicknames')) return;
      if (message.member?.roles?.cache?.has(verification_role_id)) {
        const currentRole = message.member.roles?.cache?.get(verification_role_id);

        const embedMessage = new EmbedBuilder()
          .setTitle('Verificación completa')
          .setDescription(`
            Parece que ya has hecho la verificación previamente y posees el nombre de usuario adecuado (siguiendo el formato de **Nombre_Apellido**) y el rol ${currentRole?.name}.
          `)
          .setColor('Random');
        
        await message
          .author
          .send({
            target: message.author,
            embeds: [embedMessage,],
          });
        if (message.deletable) await message.delete();
        return;
      };

      await message.member?.setNickname(newUserNickname);
      await message.member?.roles?.add(verification_role_id);
    } catch (err) {
      console.log(JSON.stringify(err));

      const embedMessage = new EmbedBuilder()
        .setTitle('Algo salió mal')
        .setDescription('Pero no te preocupes... puedes reintentar de nuevo mas tarde');
      
      await message
        .reply({
          target: message?.author,
          embeds: [embedMessage,],
        });
    }
  }

  async executeCommand(message: Message): Promise<void> {
    throw new Error('Method not implemented.');
  }

  async executeVerification(message: Message): Promise<void> {
    throw new Error('Method not implemented.');
  }

  private transformValidUsername(username: string): string | null {
    const validatorRegex = /^[a-zA-Z]+[_ ]+[a-zA-Z]+$/;
    if (!validatorRegex.test(username)) return null;

    return username.replace("_", " ");
  }
}