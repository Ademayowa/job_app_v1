const path = require('path');
const express = require('express');
const router = express.Router();
const dotenv = require('dotenv');

const Profile = require('../models/Profile');
const auth = require('../middleware/auth');
const asyncMiddleware = require('../middleware/async');
const ErrorResponse = require('../utils/errorResponse');

/**
 * @description  Get all profiles
 * @route  GET api/v1/profiles/all
 * @returns {Object} count & data
 * @access public
 */
exports.getProfiles = asyncMiddleware(async (req, res, next) => {
  const profiles = await Profile.find();

  res.status(200).json({
    success: true,
    count: profiles.length,
    data: profiles,
  });
});

/**
 * @description  Get profile by userId
 * @route  GET api/v1/profiles/user/:userId
 * @returns {Object} data
 * @access public
 */
exports.getUserById = asyncMiddleware(async (req, res, next) => {
  const user = await Profile.findOne({
    user: req.params.userId,
  }).populate('user', ['username', 'email']);

  if (!user) {
    return next(
      new ErrorResponse(`Profile ${req.params.userId} not found`, 404)
    );
  }

  res.status(200).json({ success: true, data: user });
});

/**
 * @description  Create profile
 * @route  POST api/v1/profile
 * @returns {Object} data
 * @access private
 */
exports.createProfile = asyncMiddleware(async (req, res, next) => {
  const { firstName, lastName, gender, handle } = req.body;

  const profileFields = {};

  profileFields.firstName = firstName;
  profileFields.lastName = lastName;
  profileFields.gender = gender;
  profileFields.handle = handle;

  // Get user token. The token is inside req.user
  profileFields.user = req.user.id;

  let profile = await Profile.findOne({ user: req.user.id });

  // Checks if profile exist
  profile = await Profile.findOne({ handle: profileFields.handle });

  if (profile) {
    return next(new ErrorResponse(`Profile already exist`, 409));
  }

  // Save profile
  await new Profile(profileFields).save();
  res.status(201).json({ success: true, data: profileFields });
});

/**
 * @description  Update profile
 * @route  PUT api/v1/profiles:/id
 * @returns {Object} data
 * @access private
 */
exports.updateProfile = asyncMiddleware(async (req, res, next) => {
  const profile = await Profile.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!profile) {
    return next(
      new ErrorResponse(`Profile with ${req.params.id} not found`, 404)
    );
  }

  res.status(200).json({ success: true, data: profile });
});

/**
 * @description  Delete profile
 * @route  DELETE api/v1/profiles:/id
 * @returns {Object} data
 * @access private
 */
exports.deleteProfile = asyncMiddleware(async (req, res, next) => {
  const profile = await Profile.findById(req.params.id);

  if (!profile) {
    return next(
      new ErrorResponse(`Profile with ${req.params.id} not found`, 404)
    );
  }

  profile.remove();
  res.status(200).json({ data: {} });
});

/**
 * @description  Current profile
 * @route  GET api/v1/profiles
 * @returns {Object} data
 * @access private
 */
exports.getCurrentProfile = asyncMiddleware(async (req, res, next) => {
  const profile = await Profile.findOne({
    user: req.user.id,
  }).populate('user', ['username', 'email']);

  if (!profile) {
    return next(new ErrorResponse(`You do not have a profile yet!`, 400));
  }

  res.status(200).json({ success: true, data: profile });
});

/**
 * @description  Get handle
 * @route  GET api/v1/profiles/handle/:handle
 * @returns {Object} data
 * @access public
 */
exports.getHandle = asyncMiddleware(async (req, res, next) => {
  const handle = await Profile.findOne({ handle: req.params.handle });

  if (!handle) {
    return next(
      new ErrorResponse(`Handle ${req.params.handle} not found`, 404)
    );
  }

  res.status(200).json({ success: true, data: handle });
});

/**
 * @description  Upload profile photo
 * @route  PUT api/v1/profiles/:id/photo
 * @returns {Object} message, data & status code
 * @access private
 */
exports.profilePhotoUpload = asyncMiddleware(async (req, res, next) => {
  const profile = await Profile.findById(req.params.id);

  if (!profile) {
    return next(
      // this is for when the ID is not in the db
      new ErrorResponse(`Profile with ID of ${req.params.id} not found`, 404)
    );
  }

  if (!req.files) {
    return next(new ErrorResponse(`Please upload a file`, 400));
  }

  // console.log(req.files);

  const file = req.files.file;
  // Make sure the img is a photo
  if (!file.mimetype.startsWith('image')) {
    return next(new ErrorResponse(`Please upload an image file`, 400));
  }

  // Check file size
  if (file.size > process.env.MAX_FILE_UPLOAD) {
    return next(
      new ErrorResponse(
        `Please upload an image less than ${process.env.MAX_FILE_UPLOAD}`,
        400
      )
    );
  }

  // Create cutome file name
  file.name = `photo_${profile._id}${path.parse(file.name).ext}`;

  file.mv(`${process.env.FILE_UPLOAD_PATH}/${file.name}`, async (err) => {
    if (err) {
      console.error(err);
      return next(new ErrorResponse(`Problem with file upload`, 500));
    }

    await Profile.findByIdAndUpdate(req.params.id, { photo: file.name });

    res.status(200).json({
      success: true,
      data: file.name,
    });
  });

  // console.log(file.name);
});
