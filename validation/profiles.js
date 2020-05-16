const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateProfiles(data) {
	let errors = {};

	data.firstName = !isEmpty(data.firstName) ? data.firstName : '';
	data.lastName = !isEmpty(data.lastName) ? data.lastName : '';
	data.handle = !isEmpty(data.handle) ? data.handle : '';
	data.gender = !isEmpty(data.gender) ? data.gender : '';

	if (!Validator.isLength(data.firstName, { min: 2, max: 40 })) {
		errors.firstName = 'First name must be at least 2 characters';
	}

	if (!Validator.isLength(data.lastName, { min: 2, max: 40 })) {
		errors.lastName = 'Last name must be at least 2 characters';
	}

	if (Validator.isEmpty(data.firstName)) {
		errors.firstName = 'First name is required';
	}

	if (Validator.isEmpty(data.lastName)) {
		errors.lastName = 'Last name is required';
	}

	if (Validator.isEmpty(data.handle)) {
		errors.handle = 'Handle is required';
	}

	if (Validator.isEmpty(data.gender)) {
		errors.gender = 'Gender is required';
	}

	return {
		errors,
		isValid: isEmpty(errors)
	};
};
