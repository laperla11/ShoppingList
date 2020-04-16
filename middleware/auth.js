const jwt = require('jsonwebtoken');

// Middlware for checking token from coming request
const auth = (req, res, next) => {
  const token = req.header('x-auth-token');

  // Check for token
  if (!token) {
    return res.status(401).json({ msg: 'No token, authorization denied' });
  }

  try {
    // Verify token if exists
    const decoded = jwt.verify(token, process.env.jwtSecret);

    // Add user from payload to the req
    // so we can use that data inside the conroller func
    req.user = decoded;
    next();
  } catch (err) {
    // console.log({ err });
    res.status(400).json({ msg: 'Token is not valid' });
  }
};

module.exports = auth;
