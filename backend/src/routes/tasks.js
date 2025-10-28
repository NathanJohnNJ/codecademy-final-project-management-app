const express = require('express');
const router = express.Router();
const Task = require('../models/taskModel');

// get all tasks for user
router.get('/:userid/all', async (req, res) => {
  try {
    const allUserTasks = await Task.allUserTasks(req.params.userid);
    res.status(201).json({message: `All tasks found for userID: ${req.params.userid}`, tasks: allUserTasks});
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

// get all tasks for project
router.get('/:projectid/all', async (req, res) => {
  try {
    const allProjectTasks = await Task.allProjectTasks(req.params.projectid);
    res.status(201).json({message: `All tasks found for projectID: ${req.params.projectid}`, tasks: allProjectTasks});
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

// get all tasks for team
router.get('/:teamid/all', async (req, res) => {
  try {
    const allTeamTasks = await Task.allTeamTasks(req.params.teamid);
    res.status(201).json({message: `All tasks found for teamID: ${req.params.teamid}`, tasks: allTeamTasks});
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

// get task by id
router.get('/:id', async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) return res.status(404).json({ error: 'Not found' });
    res.json(task);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

// create new task
router.post('/add', async (req, res) => {
  try {
    const newTask = await Task.create({
        task: req.body.task
    });
    res.status(201).json({
      message: `${req.body.task} successfully added.`, task: newTask});
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

// Update task by id
router.put('/:id/update', async (req, res) => {
  try {
    const id = req.params.id;
    const updates = req.body;
    const updatedTask = await Task.update({ id, updates });
    res.status(201).json({
      message: `Task successfully updated.`, task: updatedTask});
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

  // Delete task by id
router.delete('/:id/delete', async (req, res) => {
  try {
    await Task.delete(req.params.id);
    res.json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;

