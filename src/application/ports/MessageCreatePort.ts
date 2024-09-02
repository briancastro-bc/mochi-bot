import { Message, } from 'discord.js';

export interface MessageCreatePort {
  execute(message: Message): Promise<void>;
  executeCommand(message: Message): Promise<void>;
  executeVerification(message: Message): Promise<void>;
}