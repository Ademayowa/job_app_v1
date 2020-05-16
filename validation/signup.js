const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateSignup(data) {
	let errors = {};

	data.username = !isEmpty(data.username) ? data.username : '';
	data.email = !isEmpty(data.email) ? data.email : '';
	data.password = !isEmpty(data.password) ? data.password : '';
	data.password2 = !isEmpty(data.password2) ? data.password2 : '';

	if (!Validator.isLength(data.username, { min: 4, max: 10 })) {
		errors.username = 'Username must be between 4 and 10 characters';
	}
	if (Validator.isEmpty(data.email)) {
		errors.email = 'Insert your email';
	}

	if (!Validator.isEmail(data.email)) {
		errors.email = 'Email is invalid';
	}

	if (Validator.isEmpty(data.password)) {
		errors.password = 'Insert your password';
	}

	if (!Validator.isLength(data.password, { min: 4, max: 10 })) {
		errors.password = 'Password must be at least 4 characters';
	}

	if (Validator.isEmpty(data.password2)) {
		errors.password2 = 'Insert your password';
	}

	if (!Validator.equals(data.password, data.password2)) {
		errors.password2 = 'Incorrect password';
	}

	return {
		errors,
		isValid: isEmpty(errors)
	};
};
