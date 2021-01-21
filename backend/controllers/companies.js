import express from 'express';
const router = express.Router();
import asyncHandler from 'express-async-handler';
import Company from '../models/Company.js';

/**
 * @description  Get all companies
 * @route  GET api/v1/companies
 * @returns {Object} count & data
 * @access public
 *
 */
const getCompanies = asyncHandler(async (req, res) => {
  const companies = await Company.find().populate('jobs');

  res.status(200).json({
    success: true,
    count: companies.length,
    data: companies,
  });
});

/**
 * @description  Get single company
 * @route  GET api/v1/companies/:id
 * @returns {Object} data
 * @access public
 */
const getCompany = asyncHandler(async (req, res) => {
  const company = await Company.findById(req.params.id);

  if (!company) {
    res.status(404);
    throw new Error('Company not found');
  }

  res.status(200).json({ success: true, data: company });
});

/**
 * @description  Create new company
 * @route  POST api/v1/companies
 * @returns {Object} data
 * @access private
 */
const createCompany = asyncHandler(async (req, res) => {
  const company = await Company.create(req.body);
  res.status(201).json({ success: true, data: company });
});

/**
 * @description  Update company
 * @route  PUT api/v1/companies
 * @returns {Object} data
 * @access private
 */
const updateCompany = asyncHandler(async (req, res) => {
  const company = await Company.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!company) {
    res.status(404);
    throw new Error('Company with this ID not found');
  }
  res.status(200).json({ success: true, data: company });
});

/**
 * @description  DELETE company
 * @route  DELETE api/v1/companies/:id
 * @returns {Object} data
 * @access private
 */
const deleteCompany = asyncHandler(async (req, res) => {
  const company = await Company.findById(req.params.id);

  if (!company) {
    res.status(404);
    throw new Error('Company with this ID not found');
  }
  company.remove();
  res.status(200).json({ success: true, data: {} });
});

export {
  getCompanies,
  getCompany,
  createCompany,
  updateCompany,
  deleteCompany,
};
