const db = require('../db/connection');

const Task = {
  // Return all tasks belonging to user
  async allUserTasks(user_id) {
    const res = await db.query('SELECT id, title, notes, priority, completed, due_date, create_date, project_id, team_id, user_ids FROM tasks WHERE $1=ANY(user_ids) ORDER BY due_date', [user_id]);
    return res.rows;
  },

  // Return all tasks belonging to team
  async allTeamTasks(team_id) {
    const res = await db.query('SELECT id, title, notes, priority, completed, due_date, create_date, project_id, team_id, user_ids FROM tasks WHERE team_id=$1 ORDER BY due_date', [team_id]);
    return res.rows;
  },

  // Return all tasks belonging to project
  async allProjectTasks(project_id) {
    const res = await db.query('SELECT id, title, notes, priority, completed, due_date, create_date, project_id, team_id, user_ids FROM tasks WHERE project_id=$1 ORDER BY due_date', [project_id]);
    return res.rows;
  },

  // Return task by id
  async findById(id) {
    const res = await db.query('SELECT id, title, notes, priority, completed, due_date, create_date, project_id, team_id, user_ids FROM tasks WHERE id=$1', [id]);
    return res.rows[0];
  },
  
  // Creat new task
  async create(task) {
    const { id, title, notes, priority, completed, due_date, create_date, project_id, team_id, user_ids } = task;
    const res = await db.query(
      'INSERT INTO tasks(id, title, notes, priority, completed, due_date, create_date, project_id, team_id, user_ids) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING id, title, notes, priority, completed, due_date, create_date, project_id, team_id, user_ids',
      [id, title, notes, priority, completed, due_date, create_date, project_id, team_id, user_ids]
    );
    return res.rows[0];
  },

  // Update task by id
  async update({ id, updateString }) {
    const res = await db.query(
      'UPDATE tasks SET $2 WHERE id=$1', [id, updateString]
    );
    return res.rows[0];
  },

  // Delete task by id
  async delete(id) {
    await db.query('DELETE FROM tasks WHERE id=$1', [id]);
    return { success: true };
  }
};

module.exports = Task;

