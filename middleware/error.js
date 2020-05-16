// module.exports = function(err, req, res, next) {
//   // Log the error
//   res.status(500).json({ msg: 'Something Failed!' });
// };

const ErrorResponse = require('../utils/errorResponse');

const errorHandler = (err, req, res, next) => {
	let error = { ...err };

	error.message = err.message;

	// Log to console for dev
	console.log(err);

	// Mongoose bad Objectid
	if (err.name === 'CastError') {
		const message = `Resource not found`;
		error = new ErrorResponse(message, 404);
	}

	// Mongoose duplicate key
	if (err.code === 11000) {
		const message = 'Duplicate field value entered';
		error = new ErrorResponse(message, 400);
	}

	// Mongoose validation error
	if (err.name === 'ValidationError') {
		// err.errors gets the value from the errors array
		const message = Object.values(err.errors).map((val) => val.message);
		error = new ErrorResponse(message, 400);
	}

	// statusCode here is coming from errorResponse.js(in utils)
	res.status(error.statusCode || 500).json({
		success: false,
		error: error.message || 'Server Error'
	});
};

module.exports = errorHandler;
