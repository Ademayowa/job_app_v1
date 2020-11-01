const mongoose = require('mongoose');

const companySchema = new mongoose.Schema(
	{
		name: {
			type: String,
			trim: true,
			lowercase: true,
			required: [ true, 'Please add a name' ]
		},
		description: {
			type: String,
			required: [ true, 'Please add a description' ]
		},
		yearFounded: {
			type: String,
			required: [ true, 'Please add year founded' ]
		},
		website: {
			type: String,
			match: [
				/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/,
				'Please use a valid URL with HTTP or HTTPS'
			]
		},
		phone: {
			type: String,
			maxlength: [ 15, 'Phone number cannot be longer than 12 charcters' ]
		},
		email: {
			type: String,
			match: [
				/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
				'Please add a valid email'
			]
		}
	},
	{
		// create this before creating virtual below
		toJSON: { virtuals: true },
		toObject: { virtuals: true }
	}
);

companySchema.virtual('jobs', {
	ref: 'Job',
	localField: '_id',
	foreignField: 'company',
	justOne: false
});

module.exports = mongoose.model('Company', companySchema);
