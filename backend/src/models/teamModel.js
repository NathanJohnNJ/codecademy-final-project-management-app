const db = require('../db/connection');

const Team = {
  // Return all teams
  async all() {
    const res = await db.query('SELECT id, team_name, user_ids, task_ids, project_ids FROM teams ORDER BY id');
    return res.rows;
  },

  // Return one team by id
  async findById(id) {
    const res = await db.query('SELECT id, team_name, user_ids, task_ids, project_ids FROM teams WHERE id=$1', [id]);
    return res.rows[0];
  },

  // Create new team
  async create({ id, team_name, user_ids, task_ids, project_ids }) {
    const res = await db.query(
      'INSERT INTO teams(id, team_name, user_ids, task_ids, project_ids) VALUES($1, $2, $3, $4, $5, $6) RETURNING id, team_name, email',
      [id, team_name, user_ids, task_ids, project_ids]
    );
    return res.rows[0];
  },

  // Update team by id
  async update({ id, columnsToUpdate, newValues }) {
    let updateString = '';
    columnsToUpdate.map((column, i) => {
      updateString += `${column} = ${newValues[i]}`
      if (i = columnsToUpdate.length - 1){
        updateString += " ";
      } else {
        updateString += ", "
      }
    })
    const res = await db.query(
      'UPDATE teams SET $2 WHERE id=$1', [id, updateString]
    );
    return res.rows[0];
  },

  // Delete team by id
  async delete(id) {
    await db.query('DELETE FROM teams WHERE id=$1', [id]);
    return { success: true };
  }
};

module.exports = Team;

