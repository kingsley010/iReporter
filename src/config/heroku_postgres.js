import { Client } from 'pg';

const client = new Client({
  connectionString: process.env.DATABASE_URI,
  SSL: true
});
client.connect()
  .then(() => ('connected'))
  .catch(err => ('Cannot connect to database'));

module.exports = client;