const express = require('express');
const router = express.Router();
const Team = require('../models/teamModel');

  // Find all teams
router.get('/api/teams/all', async (req, res) => {
  try {
    const allTeams = await Team.all();
    res.status(201).json({message: "All teams found", teams: allTeams});
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

// Find team by id
router.get('/api/teams/:id', async (req, res) => {
  try {
    const team = await Team.findById(req.params.id);
    if (!team) return res.status(404).json({ error: 'Not found' });
    res.json(team);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

// Create team
router.post('/api/teams/add', async (req, res) => {
  try {
    const newTeam = await Team.create({
        team: req.body.team
    });
    res.status(201).json({
      message: `${req.body.team} successfully added.`, team: newTeam});
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

// Update team by id
router.put('/api/teams/:id/update', async (req, res) => {
  try {
    const id = req.params.id;
    const updates = req.body;
    const updatedTeam = await Team.update({ id, updates });
    res.status(201).json({
      message: `Team successfully updated.`, project: updatedTeam});
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

// Delete team by id
router.delete('/api/teams/:id', async (req, res) => {
  try {
    await Team.delete(req.params.id);
    res.json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;