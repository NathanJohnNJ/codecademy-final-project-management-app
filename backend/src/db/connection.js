require('dotenv').config();
const { Pool } = require('pg');

const pool = new Pool({
  connectionString: process.env.POSTGRES_DATABASE_URL,
  ssl: {
    rejectUnauthorized: false // Use true in production with valid certificates
  }
});

module.exports = {
  query: (text, params) => pool.query(text, params),
  pool
};
