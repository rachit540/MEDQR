const express = require('express');
const router = express.Router();
const { db, uuidv4 } = require('../models/Profile');

router.post('/register', (req, res) => {
  const existing = db.get('profiles').find({ email: req.body.email }).value();
  if (existing) return res.status(400).json({ error: 'Email already registered' });
  const profile = { ...req.body, profileUuid: uuidv4() };
  db.get('profiles').push(profile).write();
  res.status(201).json({ message: 'Profile created!', profileUuid: profile.profileUuid });
});

router.post('/login', (req, res) => {
  const profile = db.get('profiles').find({ email: req.body.email }).value();
  if (!profile) return res.status(404).json({ error: 'User not found' });
  if (profile.password !== req.body.password) return res.status(401).json({ error: 'Wrong password' });
  res.json({ message: 'Login successful!', profileUuid: profile.profileUuid, profile });
});

router.get('/me/:email', (req, res) => {
  const profile = db.get('profiles').find({ email: req.params.email }).value();
  if (!profile) return res.status(404).json({ error: 'Profile not found' });
  res.json(profile);
});

router.put('/update/:email', (req, res) => {
  db.get('profiles').find({ email: req.params.email }).assign(req.body).write();
  res.json({ message: 'Profile updated!' });
});

module.exports = router;