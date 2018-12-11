import { Client } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const client = new Client({
  connectionString: 'postgres://deybvxxbpuvlch:679d3a072eaa7b21105ef47387527e7fd438666aeab892b1cacf592f8a6c49f4@ec2-23-21-201-12.compute-1.amazonaws.com:5432/d3qn68r3djg36o?ssl=true&sslfactory=org.postgresql.ssl.NonValidatingFactory',
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