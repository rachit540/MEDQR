const express = require('express');
const router = express.Router();
const { db } = require('../models/Profile');

router.get('/:uuid', (req, res) => {
  const profile = db.get('profiles').find({ profileUuid: req.params.uuid }).value();
  if (!profile) return res.status(404).json({ error: 'Profile not found' });
  
  const {
    fullName,
    bloodGroup,
    gender,
    allergies,
    medications,
    conditions,
    organDonor,
    emergencyContacts,
    doctorName,
    doctorPhone
  } = profile;

  res.json({
    fullName,
    bloodGroup,
    gender,
    allergies,
    medications,
    conditions,
    organDonor,
    emergencyContacts,
    doctorName,
    doctorPhone
  });
});

module.exports = router;