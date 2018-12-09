import pg from 'pg';
import dotenv from 'dotenv';

dotenv.config();

// DB Connect String	
const pool = new pg.Pool({
  host: process.env.POSTGRES_HOST,
  user: process.env.POSTGRES_USER,
  database: process.env.POSTGRES_DATABASE,
  password: process.env.POSTGRES_PASSWORD,
  port: process.env.POSTGRES_PORT
});

// Exporting Database Details
module.exports = pool;

export default {
  session: {
    loginState: false,
    user: {
      username: ''
    },
  },
  users: [],
  records: []
};