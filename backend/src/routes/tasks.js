const express = require('express');
const router = express.Router();
const Task = require('../models/taskModel');

router.get('/task/all', async (req, res) => {
  try {
    const allTasks = await Task.all();
    res.status(201).json({message: "All tasks found", tasks: allTasks});
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

router.get('/task/:id', async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) return res.status(404).json({ error: 'Not found' });
    res.json(task);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

const addTask = async (req, res) => {
  try {
    
    
  } catch (error) {
    res.status(501).json({errorMessage: error.message, error: error});
    console.log(error);       
  }
};
router.post('/task/add', async (req, res) => {
  try {
    const { name, email } = req.body;
    if (!name || !email) {
      return res.status(400).json({ error: 'Missing name or email' });
    }
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

router.delete('/:id', async (req, res) => {
  try {
    await Task.delete(req.params.id);
    res.json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;