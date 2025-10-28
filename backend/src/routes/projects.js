const express = require('express');
const router = express.Router();
const Project = require('../models/projectModel');

//  Get all projects
router.get('/api/projects/all', async (req, res) => {
  try {
    const allProjects = await Project.allProjects();
    res.status(201).json({message: "All projects found", projects: allProjects});
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

// Gett all projects for given user
router.get('/api/projects/:user_id/all', async (req, res) => {
  try {
    const user_id = req.params.user_id;
    const allUserProjects = await Project.allUserProjects(user_id);
    res.status(201).json({message: "All projects found", projects: allUserProjects});
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

// Gett all projects for given team
router.get('/api/projects/:team_id/all', async (req, res) => {
  try {
    const team_id = req.params.team_id;
    const allTeamProjects = await Project.allUserProjects(team_id);
    res.status(201).json({message: "All projects found", projects: allTeamProjects});
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

// Get project by id
router.get('/api/projects/:id', async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) return res.status(404).json({ error: 'Not found' });
    res.json(project);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

// Add project
router.post('/api/projects/add', async (req, res) => {
  try {
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

// Update project by id
router.put('/api/projects/:id/update', async (req, res) => {
  try {
    const id = req.params.id;
    const updates = req.body;
    const updatedProject = await Project.update({ id, updates });
    res.status(201).json({
      message: `Project successfully updated.`, project: updatedProject});
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

// Delete project by id
router.delete('/api/:id', async (req, res) => {
  try {
    await Project.delete(req.params.id);
    res.json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;