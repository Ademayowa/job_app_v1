const express = require('express');
const router = express.Router();
const dotenv = require('dotenv');

const { applyJob } = require('../controllers/application');

router.post('/apply', applyJob);

module.exports = router;
