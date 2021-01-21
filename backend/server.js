import path from 'path';
import express from 'express';
import dotenv from 'dotenv';
import morgan from 'morgan';
import colors from 'colors';
import mongoSanitize from 'express-mongo-sanitize';
import { errorHandler } from './middleware/errorMiddleware.js';
import connectDB from './config/db.js';
import auth from './routes/auth.js';
import jobs from './routes/jobs.js';
import companies from './routes/companies.js';

dotenv.config();
connectDB();

const app = express();
const API_PREFIX = '/api/v1';

app.use(express.json());

// Dev logging middleware
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Sanitize inputs
app.use(mongoSanitize());

// Mount routers
app.use(`${API_PREFIX}/auth`, auth);
app.use(`${API_PREFIX}/jobs`, jobs);
app.use(`${API_PREFIX}/companies`, companies);

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
