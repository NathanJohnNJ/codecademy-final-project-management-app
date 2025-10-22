const express = require('express');
const router = express.Router();
const Project = require('../models/projectModel');

router.get('/project/all', async (req, res) => {
  try {
    const allProjects = await Project.all();
    res.status(201).json({message: "All projects found", projects: allProjects});
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

router.get('/project/:id', async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) return res.status(404).json({ error: 'Not found' });
    res.json(project);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

const addProject = async (req, res) => {
  try {
    
    
  } catch (error) {
    res.status(501).json({errorMessage: error.message, error: error});
    console.log(error);       
  }
};
router.post('/project/add', async (req, res) => {
  try {
    const { name, email } = req.body;
    if (!name || !email) {
      return res.status(400).json({ error: 'Missing name or email' });
    }
    const newProject = await Project.create({
        project: req.body.project
    });
    res.status(201).json({
      message: `${req.body.project} successfully added.`, project: newProject});
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    await Project.delete(req.params.id);
    res.json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;