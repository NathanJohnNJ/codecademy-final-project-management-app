const express = require('express');
const router = express.Router();
const User = require('../models/userModel');

  // Return all users
router.get('/all', async (req, res) => {
  try {
    const allUsers = await User.all();
    res.status(201).json({message: "All users found", users: allUsers});
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

  // Return one user by id
router.get('/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user){
      return res.status(404).json({ error: 'Not found' });
    }
    res.json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

  // Create new user
router.post('/add', async (req, res) => {
  try {
    const newUser = await User.create({
        user: req.body.user
    });
    res.status(201).json({
      message: `${req.body.user} successfully added.`, user: newUser});
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

 // Update user by id
router.put('/:id/update', async (req, res) => {
  try {
    const id = req.params.id;
    const updates = req.body;
    const updatedUser = await User.update({ id, updates });
    res.status(201).json({
      message: `User successfully updated.`, user: updatedUser});
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

  // delete user by id
router.delete('/:id/delete', async (req, res) => {
  try {
    await User.delete(req.params.id);
    res.json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;