const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema({
	company: {
		type: mongoose.Schema.ObjectId,
		ref: 'Company'
	},
	title: {
		type: String,
		trim: true,
		required: [ true, 'Please add a title' ]
	},
	jobSummary: {
		type: String,
		required: [ true, 'Please add a job summary' ]
	},
	salary: {
		type: Number,
		required: [ true, 'Please add a salary' ]
	},
	location: {
		type: String,
		required: true,
		lowercase: true
	},
	skillLevel: {
		type: String,
		required: [ true, 'Please add a skill level' ],
		enum: [ 'intern', 'junior', 'intermediate', 'senior' ]
	},
	visaSponsorship: {
		type: Boolean,
		default: false
	},
	createdAt: {
		type: Date,
		default: Date.now
	}
});

module.exports = mongoose.model('Job', jobSchema);
