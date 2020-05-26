require('dotenv').config();
const jwt = require('jsonwebtoken');

function auth(req, res, next) {
  if (!req.headers.authorization) {
    return res.status(401).json({ type: 'error', message: 'Unauthorized.' });
  }

  const token = req.headers.authorization.replace('JWT ', '');

  if (!token) {
    return res.status(401).json({ type: 'error', message: 'Unauthorized.' });
  }

  try {
    jwt.verify(token, process.env.APP_KEY);
  } catch (error) {
    return res.status(401).json({ type: 'error', message: 'Unauthorized.' });
  }

  return next();
}

module.exports = {
  auth,
};
