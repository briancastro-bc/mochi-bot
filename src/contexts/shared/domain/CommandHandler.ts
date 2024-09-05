export interface CommandHandler {
  handle(...args: Array<unknown>): Promise<unknown>;
}