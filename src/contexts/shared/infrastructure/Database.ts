import mongoose from 'mongoose';

import { container, } from '@ioc/di';

import { DatabaseConnection } from '@shared/domain/DatabaseConnection';

export class Database implements DatabaseConnection {
  constructor(
    private readonly connection: string = container
      .resolve<string>('mongo_uri'),
  ) {}

  public async connect(): Promise<void> {
    try {
      await mongoose.connect(this.connection);
      console.log('MongoDB connected successfully.');
    } catch (error) {
      console.error('Error connecting to MongoDB:', error);
      process.exit(1);
    }
  }

  public async disconnect(): Promise<void> {
    try {
      await mongoose.disconnect();
      console.log('MongoDB disconnected successfully.');
    } catch (error) {
      console.error('Error disconnecting from MongoDB:', error);
    }
  }
}