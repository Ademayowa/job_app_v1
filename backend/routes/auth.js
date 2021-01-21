import express from 'express';
const router = express.Router();
import { auth } from '../middleware/auth.js';
import dotenv from 'dotenv';
import { signin, signup, current } from '../controllers/user.js';

router.post('/sign-in', signin);
router.post('/sign-up', signup);
router.get('/current', auth, current);

export default router;
