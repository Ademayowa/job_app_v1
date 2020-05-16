const path = require('path');
const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const connectDB = require('./config/db');
const colors = require('colors');
const fileUpload = require('express-fileupload');
const errorHandler = require('./middleware/error');
const mongoSanitize = require('express-mongo-sanitize');
const auth = require('./routes/auth');
const jobs = require('./routes/jobs');
const companies = require('./routes/companies');
const profiles = require('./routes/profiles');

// Load env vars
dotenv.config({ path: './config/config.env' });

// Connect DB
connectDB();

const app = express();
const API_PREFIX = '/api/v1';

// Body parser
app.use(express.json());

// Dev logging middleware
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// File Upload
app.use(fileUpload());

// Sanitize inputs
app.use(mongoSanitize());

// Set static folder
app.use(express.static(path.join(__dirname, 'public')));

// Mount routers
app.use(`${API_PREFIX}/auth`, auth);
app.use(`${API_PREFIX}/jobs`, jobs);
app.use(`${API_PREFIX}/companies`, companies);
app.use(`${API_PREFIX}/profiles`, profiles);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(
  PORT,
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.blue.bold
  )
);

// Handle unhandled promise rejection
process.on('unhandledRejection', (err, promise) => {
  console.log(`Error: ${err.message}`.red);
});
