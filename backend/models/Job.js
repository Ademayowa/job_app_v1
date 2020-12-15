import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const jobSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    lowercase: true,
    required: [true, 'Please add a name'],
  },
  website: {
    type: String,
    match: [
      /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/,
      'Please use a valid URL with HTTP or HTTPS',
    ],
  },
  phone: {
    type: String,
    maxlength: [15, 'Phone number cannot be longer than 12 charcters'],
  },
  email: {
    type: String,
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      'Please add a valid email',
    ],
  },
  title: {
    type: String,
    trim: true,
    required: [true, 'Please add a title'],
  },
  summary: {
    type: String,
    required: [true, 'Please add job summary'],
  },
  description: {
    type: String,
    required: [true, 'Please add job description'],
  },
  responsibilities: {
    role: {
      type: [String],
      required: [true, 'Please add respnsibilities'],
    },
  },
  salary: {
    type: String,
    required: [true, 'Please add salary'],
  },
  location: {
    type: String,
    required: true,
  },
  skillLevel: {
    type: String,
    required: [true, 'Please add a skill level'],
    enum: ['intern', 'junior', 'intermediate', 'senior'],
  },
  skills: {
    skill: {
      type: [String],
      required: [true, 'Please add skills'],
    },
  },
  logo: {
    type: String,
  },
  about: {
    type: String,
    required: [true, 'Please add about'],
  },
  type: {
    type: String,
    required: [true, 'Please add a type'],
  },
  visaSponsorship: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Job = mongoose.model('Job', jobSchema);

export default Job;
