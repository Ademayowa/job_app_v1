import express from 'express';
const router = express.Router();
import asyncHandler from 'express-async-handler';
import Job from '../models/Job.js';

/**
 * @description  Get all jobs
 * @route  GET api/v1/jobs
 * @route  GET api/v1/companies/:companyId/jobs => this gets jobs for specific companies *TODO*
 * @returns {Object} message & data
 * @access public
 *
 */
const getJobs = asyncHandler(async (req, res) => {
  const jobs = await Job.find();
  res.status(200).json({ success: true, count: jobs.length, data: jobs });
});

/**
 * @description  Get single job
 * @route  GET api/v1/jobs/:id
 * @returns {Object} message & data
 * @access public
 */
const getJob = asyncHandler(async (req, res) => {
  const job = await Job.findById(req.params.id);

  if (!job) {
    res.status(404);
    throw new Error('Job ID not found');
  }
  res.status(200).send({ success: true, data: job });
});

/**
 * @description  Create new job
 * @route  POST api/v1/jobs
 * @returns {Object} message & data
 * @access private
 */
const createJob = asyncHandler(async (req, res) => {
  const job = await Job.create(req.body);
  res.status(200).json({ success: true, data: job });
});

/**
 * @description  Update job
 * @route  PUT api/v1/jobs/:id
 * @returns {Object} message & data
 * @access private
 */
const updateJob = asyncHandler(async (req, res) => {
  const job = await Job.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!job) {
    res.status(404);
    throw new Error('Job ID not found');
  }
  res.status(200).json({ success: true, data: job });
});

/**
 * @description  Delete job
 * @route  DELETE api/v1/jobs/:id
 * @returns {Object} message & data
 * @access private
 */
const deleteJob = asyncHandler(async (req, res) => {
  const job = await Job.findById(req.params.id);

  if (!job) {
    res.status(404);
    throw new Error('Job not found');
  }

  job.remove();
  res.status(200).json({ success: true, data: {} });
});

export { getJobs, getJob, createJob, updateJob, deleteJob };
