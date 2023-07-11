/* eslint-disable no-unused-vars */
/* eslint-disable consistent-return */
const usersRouter = require('express').Router();
const bcrypt = require('bcrypt');
const { User } = require('../models');

usersRouter.post('/', async (request, response) => {
  if (!request.body.username || !request.body.password) {
    return response.status(400).json({
      error: 'username or password missing',
    });
  }

  const { username, password, name } = request.body;

  if (username.length <= 3 || password.length <= 3) {
    return response.status(400).json({
      error: 'username and password must be longer than 3 characters',
    });
  }

  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(password, saltRounds);

  const user = new User({ username, passwordHash, name });

  try {
    const savedUser = await user.save();
    response.status(201).json(savedUser);
  } catch (error) {
    if (error.code === 11000) {
      return response.status(400).json({
        error: 'username already exists',
      });
    }
    return response.status(500).json({
      error: 'an error occurred while creating the user',
    });
  }
});

usersRouter.get('/', async (_, response) => {
  const users = await User.find({}).populate('blogs');
  response.send(users);
});

usersRouter.delete('/', async (request, response) => {
  await User.deleteMany({});
  const users = await User.find({});
  response.send(users);
});

module.exports = usersRouter;
