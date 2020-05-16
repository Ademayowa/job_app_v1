const express = require('express');
const router = express.Router();
const dotenv = require('dotenv');
const { auth } = require('../middleware/auth');

const {
  getProfiles,
  getUserById,
  createProfile,
  updateProfile,
  deleteProfile,
  getCurrentProfile,
  getHandle,
  profilePhotoUpload
} = require('../controllers/profiles');

router.get('/all', getProfiles);
router.get('/user/:userId', getUserById);
router.post('/', auth, createProfile);
router.put('/:id', auth, updateProfile);
router.delete('/:id', auth, deleteProfile);
router.get('/', auth, getCurrentProfile);
router.get('/handle/:handle', getHandle);
router.put('/:id/photo', auth, profilePhotoUpload);

module.exports = router;
