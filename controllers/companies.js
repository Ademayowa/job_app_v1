const express = require('express');
const router = express.Router();
const dotenv = require('dotenv');

const Company = require('../models/Company');
const asyncMiddleware = require('../middleware/async');
const ErrorResponse = require('../utils/errorResponse');

/**
 * @description  Get all companies
 * @route  GET api/v1/companies
 * @returns {Object} count & data
 * @access public
 * // asyncMiddleware allows you avoid using try & catch while new             ErrorResponse allows you to pass the error(in a try catch block) to the next obj
 */
exports.getCompanies = asyncMiddleware(async (req, res, next) => {
  const companies = await Company.find().populate('jobs');

  res.status(200).json({
    success: true,
    count: companies.length,
    data: companies
  });
});

/**
 * @description  Get single company
 * @route  GET api/v1/companies/:id
 * @returns {Object} data
 * @access public
 */
exports.getCompany = asyncMiddleware(async (req, res, next) => {
  const company = await Company.findById(req.params.id);

  if (!company) {
    return next(
      new ErrorResponse(
        `Company not found with the ID of ${req.params.id}`,
        404
      )
    );
  }

  res.status(200).json({ success: true, data: company });
});

/**
 * @description  Create new company
 * @route  POST api/v1/companies
 * @returns {Object} data
 * @access private
 */
exports.createCompany = asyncMiddleware(async (req, res, next) => {
  const company = await Company.create(req.body);

  res.status(201).json({ success: true, data: company });
});

/**
 * @description  Update company
 * @route  PUT api/v1/companies
 * @returns {Object} data
 * @access private
 */
exports.updateCompany = asyncMiddleware(async (req, res, next) => {
  const company = await Company.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  });

  if (!company) {
    return next(
      new ErrorResponse(
        `Company not found with the ID of ${req.params.id}`,
        404
      )
    );
  }

  res.status(200).json({ success: true, data: company });
});

/**
 * @description  DELETE company
 * @route  DELETE api/v1/companies/:id
 * @returns {Object} data
 * @access private
 */
exports.deleteCompany = asyncMiddleware(async (req, res, next) => {
  const company = await Company.findById(req.params.id);

  if (!company) {
    return next(
      new ErrorResponse(
        `Company not found with the ID of ${req.params.id}`,
        404
      )
    );
  }

  company.remove();
  res.status(200).json({ success: true, data: {} });
});
