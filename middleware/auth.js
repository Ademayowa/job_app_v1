const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const User = require('../models/User');

exports.auth = async (req, res, next) => {
  // Get token from the header
  let token;

  token = req.header('Authorization');
  // Check if token does not exist
  if (!token) {
    return res.status(401).json({
      msg: 'Authorization denied!',
    });
  }

  try {
    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // console.log(decoded);
    req.user = await User.findById(decoded.id);
    next();
  } catch (err) {
    res.status(401).json({
      msg: 'Token is invalid!',
    });
  }
};
