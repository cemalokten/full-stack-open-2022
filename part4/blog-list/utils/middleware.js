/* eslint-disable consistent-return */
const jwt = require('jsonwebtoken');
const { User } = require('../models');

const decryptToken = (request, _, next) => {
  const authorization = request.get('authorization');
  if (authorization && authorization.startsWith('bearer')) {
    request.token = authorization.replace('bearer ', '');
  }
  next();
};

const userExtractor = async (request, response, next) => {
  const decodedToken = jwt.verify(request.token, process.env.JWT_SECRET);
  if (!decodedToken.id) { return response.status(401).json({ error: 'token invalid' }); }
  request.user = await User.findById(decodedToken.id);
  next();
};

module.exports = { decryptToken, userExtractor };
