const db = require('../db/connection');

const Task = {
  async all() {
    const res = await db.query('SELECT id, name, email FROM tasks ORDER BY id');
    return res.rows;
  },
  async findById(id) {
    const res = await db.query('SELECT id, name, email FROM tasks WHERE id=$1', [id]);
    return res.rows[0];
  },
  async findByEmail(email) {
    const res = await db.query('SELECT id, name, email, password_hash FROM tasks WHERE email=$1', [email]);
    return res.rows[0];
  },
  async create({ name, email, password_hash }) {
    const res = await db.query(
      'INSERT INTO tasks(name, email, password_hash) VALUES($1, $2, $3) RETURNING id, name, email',
      [name, email, password_hash]
    );
    return res.rows[0];
  },
  async delete(id) {
    await db.query('DELETE FROM tasks WHERE id=$1', [id]);
    return { success: true };
  }
};

module.exports = Task;
