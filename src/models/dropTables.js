import { Client } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const client = new Client({
  connectionString: process.env.DATABASE_URI || 'postgres://postgres:postgres@local_host',
  SSL: true
});

const create = async () => {
  try {
    await client.connect();
    await client.query('DROP TABLE IF EXISTS users;');
    await client.query('DROP TABLE IF EXISTS records;');
    await client.end();
    console.log('User and Record tables dropped successfully');
    process.exit(0);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

create();