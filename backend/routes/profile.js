const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const { db, uuidv4 } = require('../models/Profile');

router.post('/register', async (req, res) => {
  try {
    const { email, password, fullName, ...rest } = req.body;
    if (!email || !password || !fullName) {
      return res.status(400).json({ error: 'Email, password, and full name are required' });
    }

    const existing = db.get('profiles').find({ email }).value();
    if (existing) return res.status(400).json({ error: 'Email already registered' });

    const hashedPassword = await bcrypt.hash(password, 10);
    const profile = {
      email,
      password: hashedPassword,
      fullName,
      ...rest,
      profileUuid: uuidv4()
    };

    db.get('profiles').push(profile).write();
    res.status(201).json({ message: 'Profile created!', profileUuid: profile.profileUuid });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error during registration' });
  }
});

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' });
    }

    const profile = db.get('profiles').find({ email }).value();
    if (!profile) return res.status(404).json({ error: 'User not found' });

    const isMatch = await bcrypt.compare(password, profile.password);
    if (!isMatch) return res.status(401).json({ error: 'Wrong password' });

    const profileResponse = { ...profile };
    delete profileResponse.password;

    res.json({ message: 'Login successful!', profileUuid: profile.profileUuid, profile: profileResponse });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error during login' });
  }
});

router.get('/me/:email', (req, res) => {
  const profile = db.get('profiles').find({ email: req.params.email }).value();
  if (!profile) return res.status(404).json({ error: 'Profile not found' });
  
  const profileResponse = { ...profile };
  delete profileResponse.password;
  res.json(profileResponse);
});

router.put('/update/:email', async (req, res) => {
  try {
    const profile = db.get('profiles').find({ email: req.params.email });
    if (!profile.value()) return res.status(404).json({ error: 'Profile not found' });

    const updateData = { ...req.body };
    if (updateData.password) {
      updateData.password = await bcrypt.hash(updateData.password, 10);
    }

    profile.assign(updateData).write();
    res.json({ message: 'Profile updated!' });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error during update' });
  }
});

module.exports = router;