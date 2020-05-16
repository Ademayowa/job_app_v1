const express = require('express');
const router = express.Router();
const dotenv = require('dotenv');

const Job = require('../models/Job');
const asyncMiddleware = require('../middleware/async');
const ErrorResponse = require('../utils/errorResponse');

/**
 * @description  Get all jobs
 * @route  GET api/v1/jobs
 * @route  GET api/v1/companies/:companyId/jobs => this gets jobs for specific companies *TODO*
 * @returns {Object} message & data
 * @access public
 * // asyncMiddleware allows you avoid using try & catch while newErrorResponse allows you to pass the error(in a try catch block) to the     next obj
 */
exports.getJobs = asyncMiddleware(async (req, res, next) => {
  // console.log(req.query);

  let query;

  // JSON.stringify converts the query in the URL to string
  queryStrUrl = JSON.stringify(req.query);

  // queryStrUrl is d query in d URL from our backend while the first money sign is for d template literal & the second money sign is for the mongoose pattern symbol
  queryStrUrl = queryStrUrl.replace(
    /\b(gt|gte|lt|lte|in)\b/g,
    match => `$${match}`
  );

  // pass query variable into job model.
  // JSON.parse converts the query in the URL back to JSON format
  query = Job.find(JSON.parse(queryStrUrl));

  // query here is the same as Job.find()
  const jobs = await query;

  res.status(200).json({ success: true, count: jobs.length, data: jobs });
});

/**
 * @description  Get single job
 * @route  GET api/v1/jobs/:id
 * @returns {Object} message & data
 * @access public
 */
exports.getJob = asyncMiddleware(async (req, res, next) => {
  const job = await Job.findById(req.params.id);

  if (!job) {
    return next(
      new ErrorResponse(`Job not found with the ID of ${req.params.id}`, 404)
    );
  }
  res.status(200).send({ success: true, data: job });
});

/**
 * @description  Create new job
 * @route  POST api/v1/jobs
 * @returns {Object} message & data
 * @access private
 */
exports.createJob = asyncMiddleware(async (req, res, next) => {
  const job = await Job.create(req.body);
  res.status(200).json({ success: true, data: job });
});

/**
 * @description  Update job
 * @route  PUT api/v1/jobs/:id
 * @returns {Object} message & data
 * @access private
 */
exports.updateJob = asyncMiddleware(async (req, re, next) => {
  const job = await Job.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  });

  if (!job) {
    return next(
      // this is for when the ID is not in the db
      new ErrorResponse(`Job not found with the ID ${req.params.id}`, 404)
    );
  }
  res.status(200).json({ success: true, data: job });
});

/**
 * @description  Delete job
 * @route  DELETE api/v1/jobs/:id
 * @returns {Object} message & data
 * @access private
 */
exports.deleteJob = asyncMiddleware(async (req, res, next) => {
  const job = await Job.findById(req.params.id);

  if (!job) {
    return next(
      new ErrorResponse(`Job not found with the ID of ${req.params.id}`, 404)
    );
  }

  job.remove();
  res.status(200).json({ success: true, data: {} });
});
