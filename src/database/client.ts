import knex from 'knex';
import mongoose from 'mongoose';

// const database = knex({
//   client: 'pg',
//   connection: {
//     connectionString: process.env.DB_CONNECTION,
//     host: process.env.DB_HOST!,
//     port: +process.env.DB_PORT!,
//     user: process.env.DB_USER!,
//     password: process.env.DB_PASSWORD!,
//     database: process.env.DB_DATABASE!,
//   },
//   debug: true,
// });
const MONGO_URI = process.env.MONGO_URI;
if (!MONGO_URI) throw new Error();

const database = await mongoose.connect(MONGO_URI!);

export default database;