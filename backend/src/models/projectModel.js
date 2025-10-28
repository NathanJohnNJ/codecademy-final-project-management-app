const db = require('../db/connection');

const Project = {
   // Return all projects
  async allProjects() {
    const res = await db.query('SELECT id, title, notes, priority, completed, due_date, created_date, task_ids, team_ids, user_ids, project_image FROM projects ORDER BY due_date');
    return res.rows;
  },

  // Return all prjects belonging to user
  async allUserProjects(user_id) {
    const res = await db.query('SELECT id, title, notes, priority, completed, due_date, created_date, task_ids, team_ids, user_ids, project_image FROM projects WHERE $1=ANY(user_ids) ORDER BY due_date', [user_id]);
    return res.rows;
  },

  // Return all prjects belonging to team
  async allTeamProjects(team_id) {
    const res = await db.query('SELECT id, title, notes, priority, completed, due_date, created_date, task_ids, team_ids, user_ids, project_image FROM projects WHERE $1=ANY(team_ids) ORDER BY due_date', [team_id]);
    return res.rows;
  },

  // Return project by id
  async findById(id) {
    const res = await db.query('SELECT id, title, notes, priority, completed, due_date, created_date, task_ids, team_ids, user_ids, project_image FROM projects WHERE id=$1', [id]);
    return res.rows[0];
  },
  
  // Create new project
  async create(newProject) {
    const { id, title, notes, priority, completed, due_date, created_date, task_ids, team_ids, user_ids, project_image } = newProject;
    const res = await db.query(
      'INSERT INTO projects(id, title, notes, priority, completed, due_date, created_date, task_ids, team_ids, user_ids, project_image) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11) RETURNING id, title, notes, priority, completed, due_date, created_date, task_ids, team_ids, user_ids, project_image',
      [id, title, notes, priority, completed, due_date, created_date, task_ids, team_ids, user_ids, project_image]
    );
    return res.rows[0];
  },

  // Update project by id
  async update({ id, updates }) {
    const setClauses = Object.keys(updates).map((key, i) => `${key} = $${i + 2}`);
    const values = Object.values(updates);
    const query = `UPDATE projects SET ${setClauses.join(', ')} WHERE id = $1`;
    const res = await db.query(query, [id, ...values]);
    return res.rows[0];
  },

  // Delete project by id
  async delete(id) {
    await db.query('DELETE FROM projects WHERE id=$1', [id]);
    return { success: true };
  }
};

module.exports = Project;
