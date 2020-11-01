const express = require('express');
const router = express.Router();
const dotenv = require('dotenv');
const Application = require('../models/Application');
const asyncMiddleware = require('../middleware/async');
const ErrorResponse = require('../utils/errorResponse');

/**
 * @description  Application form data
 * @route  POST api/v1/jobs/apply
 * @returns {Object} message & data
 * @access public
 */
exports.applyJob = asyncMiddleware(async (req, res, next) => {
  const job = await Application.create(req.body);
  res.status(200).json({ success: true, data: job });
});
