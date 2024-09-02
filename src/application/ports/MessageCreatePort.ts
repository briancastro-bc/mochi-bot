import { Message, } from 'discord.js';

export interface MessageCreatePort {
  execute(message: Message): Promise<void>;
  transformValidUsername(username: string): string | null;
}