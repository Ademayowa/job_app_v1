const fs = require('fs');
const mongoose = require('mongoose');
const colors = require('colors');
const dotenv = require('dotenv');

// Load env vars
dotenv.config({ path: './config/config.env' });

// Load models
const Job = require('./models/Job');
const Company = require('./models/Company');

// Connect to DB
mongoose.connect(process.env.MONGO_URI, {
	useNewUrlParser: true,
	useCreateIndex: true,
	useFindAndModify: false,
	useUnifiedTopology: true
});

// Read JSON files
const jobs = JSON.parse(
	fs.readFileSync(`${__dirname}/_data/jobs.json`, 'utf-8')
);

const companies = JSON.parse(
	fs.readFileSync(`${__dirname}/_data/companies.json`, 'utf-8')
);

// Import into DB
const importData = async () => {
	try {
		await Job.create(jobs);
		await Company.create(companies);

		console.log('Data imported...'.green.inverse);
		process.exit();
	} catch (err) {
		console.error(err);
	}
};

// Delete data
const deleteData = async () => {
	try {
		await Job.deleteMany();
		await Company.deleteMany();

		console.log('Data destroyed...'.red.inverse);
		process.exit();
	} catch (err) {
		console.error(err);
	}
};

// Script that either delete or import data
if (process.argv[2] === '-i') {
	importData();
} else if (process.argv[2] === '-d') {
	deleteData();
}
