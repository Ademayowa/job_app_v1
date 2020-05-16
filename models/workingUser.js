const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
	username: {
		type: String,
		required: [ true, 'Please add a username' ],
		unique: true,
		maxlength: [ 10, 'Username cannot be more than 10 charcters' ],
		lowercase: true
	},
	email: {
		type: String,
		required: [ true, 'Please add an email' ],
		unique: true,
		match: [
			/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
			'Please add a valid email'
		]
	},
	password: {
		type: String,
		required: true
	},
	date: {
		type: Date,
		default: Date.now
	}
});

module.exports = mongoose.model('User', userSchema);
