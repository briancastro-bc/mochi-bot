import { container, } from '@ioc/di';

import { DatabaseConnection, } from '@shared/domain/DatabaseConnection';
import { ShardDisconnectPort, } from '@application/ports/ShardDisconnectPort';

export class ShardDisconnectUseCase implements ShardDisconnectPort {
  constructor(
    private readonly database: DatabaseConnection = container
      .resolve<DatabaseConnection>('DatabaseConnection'),
  ) {}

  async execute(): Promise<void> {
    await this.database.disconnect();
  }
}