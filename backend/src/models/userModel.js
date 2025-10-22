const db = require('../db/connection');

const User = {
  async all() {
    const res = await db.query('SELECT id, name, email, tasks, teams, projects FROM users ORDER BY id');
    return res.rows;
  },
  async findById(id) {
    const res = await db.query('SELECT id, name, email, password_hash, tasks, teams, projects FROM users WHERE id=$1', [id]);
    return res.rows[0];
  },
  async create({ name, email, password_hash, tasks, teams, projects }) {
    const res = await db.query(
      'INSERT INTO users(name, email, password_hash, tasks, teams, projects) VALUES($1, $2, $3, $4, $5, $6) RETURNING id, name, email',
      [name, email, password_hash, tasks, teams, projects]
    );
    return res.rows[0];
  },
  async delete(id) {
    await db.query('DELETE FROM users WHERE id=$1', [id]);
    return { success: true };
  }
};

module.exports = User;
