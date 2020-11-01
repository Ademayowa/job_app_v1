const mongoose = require('mongoose');

const applySchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  resumeUrl: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('Application', applySchema);
