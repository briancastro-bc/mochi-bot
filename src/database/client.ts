import mongoose from 'mongoose';

const database = await mongoose
  .connect(process.env.MONGO_URI!);

export default database;

export * from 'mongoose';