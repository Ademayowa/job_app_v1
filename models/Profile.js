const mongoose = require('mongoose');

const profileSchema = new mongoose.Schema({
	user: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User'
	},
	firstName: {
		type: String,
		trim: true,
		lowercase: true,
		required: [ true, 'Firstname is required' ]
	},
	lastName: {
		type: String,
		trim: true,
		lowercase: true,
		required: [ true, 'Lastname is required' ]
	},
	gender: {
		type: String,
		enum: [ 'male', 'female' ],
		required: [ true, 'Gender is required' ]
	},
	handle: {
		type: String,
		unique: true,
		required: [ true, 'Handle is required' ]
	},
	education: [
		{
			schoolName: {
				type: String,
				required: true
			},
			address: {
				type: String,
				required: true
			},
			country: {
				type: String,
				required: true
			},
			grade: {
				type: String,
				required: true
			},
			graduationYear: {
				type: String,
				required: true
			}
		}
	],
	photo: {
		type: String,
		default: 'no-photo.jpg'
	},
	date: {
		type: Date,
		default: Date.now
	}
});

module.exports = mongoose.model('Profile', profileSchema);
