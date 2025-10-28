const db = require('../db/connection');

const Team = {
  // Return all teams
  async all() {
    const res = await db.query('SELECT id, team_name, user_ids, task_ids, project_ids, profile_image FROM teams ORDER BY id');
    return res.rows;
  },

  // Return one team by id
  async findById(id) {
    const res = await db.query('SELECT id, team_name, user_ids, task_ids, project_ids, profile_image FROM teams WHERE id=$1', [id]);
    return res.rows[0];
  },

  // Create new team
  async create({ id, team_name, user_ids, task_ids, project_ids, profile_image }) {
    const res = await db.query(
      'INSERT INTO teams(id, team_name, user_ids, task_ids, project_ids, profile_image) VALUES($1, $2, $3, $4, $5, $6) RETURNING id, team_name, email',
      [id, team_name, user_ids, task_ids, project_ids, profile_image]
    );
    return res.rows[0];
  },

  // Update team by id
  async update({ id, updates }) {
      const setClauses = Object.keys(updates).map((key, i) => `${key} = $${i + 2}`);
      const values = Object.values(updates);
      const query = `UPDATE teams SET ${setClauses.join(', ')} WHERE id = $1`;
      const res = await db.query(query, [id, ...values]);
      return res.rows[0];
    },                                

  // Delete team by id
  async delete(id) {
    await db.query('DELETE FROM teams WHERE id=$1', [id]);
    return { success: true };
  }
};

module.exports = Team;

