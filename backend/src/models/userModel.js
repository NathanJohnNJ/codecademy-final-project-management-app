const db = require('../db/connection');

const User = {
  // Return all users
  async all() {
    const res = await db.query('SELECT id, name, email, tasks, teams, projects FROM users ORDER BY id');
    return res.rows;
  },

  // Return one user by id
  async findById(id) {
    const res = await db.query('SELECT id, name, email, password_hash, tasks, teams, projects FROM users WHERE id=$1', [id]);
    return res.rows[0];
  },

  // Create new user
  async create(user) {
    const { name, email, password_hash, tasks, teams, projects } = user;
    const res = await db.query(
      'INSERT INTO users(name, email, password_hash, tasks, teams, projects) VALUES($1, $2, $3, $4, $5, $6) RETURNING id, name, email',
      [name, email, password_hash, tasks, teams, projects]
    );
    return res.rows[0];
  },

   // Update user by id
    async update({ id, updateString }) {
      const res = await db.query(
        'UPDATE users SET $2 WHERE id=$1', [id, updateString]
      );
      return res.rows[0];
    },

  // delete user by id
  async delete(id) {
    await db.query('DELETE FROM users WHERE id=$1', [id]);
    return { success: true };
  }
};

module.exports = User;

