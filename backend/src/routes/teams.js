const express = require('express');
const router = express.Router();
const Team = require('../models/teamModel');

router.get('/team/all', async (req, res) => {
  try {
    const allTeams = await Team.all();
    res.status(201).json({message: "All teams found", teams: allTeams});
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

router.get('/team/:id', async (req, res) => {
  try {
    const team = await Team.findById(req.params.id);
    if (!team) return res.status(404).json({ error: 'Not found' });
    res.json(team);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

const addTeam = async (req, res) => {
  try {
    
    
  } catch (error) {
    res.status(501).json({errorMessage: error.message, error: error});
    console.log(error);       
  }
};
router.post('/team/add', async (req, res) => {
  try {
    const { name, email } = req.body;
    if (!name || !email) {
      return res.status(400).json({ error: 'Missing name or email' });
    }
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

router.delete('/:id', async (req, res) => {
  try {
    await Team.delete(req.params.id);
    res.json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;