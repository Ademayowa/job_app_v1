import express from 'express';
const router = express.Router();
import dotenv from 'dotenv';

import {
  getJobs,
  getJob,
  createJob,
  updateJob,
  deleteJob,
} from '../controllers/jobs.js';

router.route('/').get(getJobs).post(createJob);

router.route('/:id').get(getJob).put(updateJob).delete(deleteJob);

export default router;
