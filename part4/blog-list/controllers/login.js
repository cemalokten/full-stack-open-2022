/* eslint-disable no-underscore-dangle */
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const loginRouter = require('express').Router();
const User = require('../models/users');

loginRouter.post('/', async (request, response) => {
  const { username, password } = request.body;

  const user = await User.findOne({ username });

  if (!user) {
    response.status(400).json({ message: 'User does not exist' });
  }

  const passCheck = await bcrypt.compare(password, user.passwordHash);

  if (!passCheck) {
    response.status(400).json({ message: 'Password is incorrect' });
  }

  const tokenContent = {
    username: user.username,
    id: user._id,
  };

  const token = jwt.sign(tokenContent, process.env.JWT_SECRET);

  response.status(200).send({ token, username: user.username, name: user?.name });
});

module.exports = loginRouter;
