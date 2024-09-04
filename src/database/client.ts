import mongoose from 'mongoose';

const MONGO_URI = process.env.MONGO_URI;
if (!MONGO_URI) throw new Error();

const database = mongoose.connect(MONGO_URI!);

export default database;

export * from 'mongoose';