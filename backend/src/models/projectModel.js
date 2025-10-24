const db = require('../db/connection');

const Project = {
   // Return all projects
  async allProjects() {
    const res = await db.query('SELECT id, title, notes, priority, completed, due_date, create_date, task_ids, team_ids, user_ids FROM projects ORDER BY due_date');
    return res.rows;
  },

  // Return all prjects belonging to user
  async allUserProjects(user_id) {
    const res = await db.query('SELECT id, title, notes, priority, completed, due_date, create_date, task_ids, team_ids, user_ids FROM projects WHERE $1=ANY(user_ids) ORDER BY due_date', [user_id]);
    return res.rows;
  },

  // Return all prjects belonging to team
  async allTeamProjects(team_id) {
    const res = await db.query('SELECT id, title, notes, priority, completed, due_date, create_date, task_ids, team_ids, user_ids FROM projects WHERE $1=ANY(team_ids) ORDER BY due_date', [team_id]);
    return res.rows;
  },

  // Return project by id
  async findById(id) {
    const res = await db.query('SELECT id, title, notes, priority, completed, due_date, create_date, task_ids, team_ids, user_ids FROM projects WHERE id=$1', [id]);
    return res.rows[0];
  },
  
  // Create new project
  async create(newProject) {
    const { id, title, notes, priority, completed, due_date, create_date, task_ids, team_ids, user_ids } = newProject;
    const res = await db.query(
      'INSERT INTO projects(id, title, notes, priority, completed, due_date, create_date, task_ids, team_ids, user_ids) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING id, title, notes, priority, completed, due_date, create_date, task_ids, team_ids, user_ids',
      [id, title, notes, priority, completed, due_date, create_date, task_ids, team_ids, user_ids]
    );
    return res.rows[0];
  },

  // Update project by id
  async update({ id, updateString }) {
    const res = await db.query(
      'UPDATE projects SET $2 WHERE id=$1', [id, updateString]
    );
    return res.rows[0];
  },

  // Delete project by id
  async delete(id) {
    await db.query('DELETE FROM projects WHERE id=$1', [id]);
    return { success: true };
  }
};

module.exports = Project;
