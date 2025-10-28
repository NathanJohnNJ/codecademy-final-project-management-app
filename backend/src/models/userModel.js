const db = require('../db/connection');

const User = {
  // Return all users
  async all() {
    const res = await db.query('SELECT id, user_name, email, tasks, teams, projects, profile_image FROM users ORDER BY id');
    return res.rows;
  },

  // Return one user by id
  async findById(id) {
    const res = await db.query('SELECT id, user_name, email, tasks, teams, projects, profile_image FROM users WHERE id=$1', [id]);
    return res.rows[0];
  },

  // Create new user
  async create(user) {
    const { user_name, email, password_hash, tasks, teams, projects, profile_image } = user;
    const res = await db.query(
      'INSERT INTO users(user_name, email, password_hash, tasks, teams, projects, profile_image) VALUES($1, $2, $3, $4, $5, $6) RETURNING id, user_name, email',
      [user_name, email, password_hash, tasks, teams, projects, profile_image]
    );
    return res.rows[0];
  },

   // Update user by id
    async update({ id, updates }) {
        const setClauses = Object.keys(updates).map((key, i) => `${key} = $${i + 2}`);
        const values = Object.values(updates);
        const query = `UPDATE users SET ${setClauses.join(', ')} WHERE id = $1`;
        const res = await db.query(query, [id, ...values]);
        return res.rows[0];
      },

  // delete user by id
  async delete(id) {
    await db.query('DELETE FROM users WHERE id=$1', [id]);
    return { success: true };
  }
};

module.exports = User;

