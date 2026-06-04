const express = require('express');
const router = express.Router();
const { db } = require('../models/Profile');

router.get('/:uuid', (req, res) => {
  const profile = db.get('profiles').find({ profileUuid: req.params.uuid }).value();
  if (!profile) return res.status(404).json({ error: 'Profile not found' });
  const { name, bloodType, allergies, medications, conditions, emergencyContact } = profile;
  res.json({ name, bloodType, allergies, medications, conditions, emergencyContact });
});

module.exports = router;