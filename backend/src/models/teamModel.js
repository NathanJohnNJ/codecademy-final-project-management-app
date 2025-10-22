const db = require('../db/connection');

const Team = {
  async all() {
    const res = await db.query('SELECT id, name, email FROM teams ORDER BY id');
    return res.rows;
  },
  async findById(id) {
    const res = await db.query('SELECT id, name, email FROM teams WHERE id=$1', [id]);
    return res.rows[0];
  },
  async findByEmail(email) {
    const res = await db.query('SELECT id, name, email, password_hash FROM teams WHERE email=$1', [email]);
    return res.rows[0];
  },
  async create({ name, email, password_hash }) {
    const res = await db.query(
      'INSERT INTO teams(name, email, password_hash) VALUES($1, $2, $3) RETURNING id, name, email',
      [name, email, password_hash]
    );
    return res.rows[0];
  },
  async delete(id) {
    await db.query('DELETE FROM teams WHERE id=$1', [id]);
    return { success: true };
  }
};

module.exports = Team;
