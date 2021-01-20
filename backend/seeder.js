import mongoose from 'mongoose';
import dotenv from 'dotenv';
import colors from 'colors';
import jobs from './data/jobs.js';
import Job from './models/Job.js';
import connectDB from './config/db.js';

dotenv.config();
connectDB();

const importData = async () => {
  try {
    await Job.insertMany(jobs);

    console.log('Data imported'.green.inverse);
    process.exit();
  } catch (error) {
    console.error(`${error}`.red.inverse);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    await Job.deleteMany();

    console.log('Data destroyed'.red.inverse);
    process.exit();
  } catch (error) {
    console.error(`${error}`.red.inverse);
    process.exit(1);
  }
};

if (process.argv[2] === '-d') {
  // use npm run data:destroy to remove data
  destroyData();
} else {
  // use npm run data:import to import data
  importData();
}
