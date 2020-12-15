import express from 'express';
const router = express.Router();
// import dotenv from ('dotenv');
import { auth } from '../middleware/auth.js';

const {
  getProfiles,
  getUserById,
  createProfile,
  updateProfile,
  deleteProfile,
  getCurrentProfile,
  getHandle,
  profilePhotoUpload,
} = require('../controllers/profiles');

router.get('/all', getProfiles);
router.get('/user/:userId', getUserById);
router.post('/', auth, createProfile);
router.put('/:id', auth, updateProfile);
router.delete('/:id', auth, deleteProfile);
router.get('/', auth, getCurrentProfile);
router.get('/handle/:handle', getHandle);
router.put('/:id/photo', auth, profilePhotoUpload);

export default router;
