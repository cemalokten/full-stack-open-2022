const usersRouter = require('express').Router();
const bcrypt = require('bcrypt');
const User = require('../models/users');

usersRouter.post('/', async (request, response) => {
  const { username, password, name } = request.body;

  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(password, saltRounds);

  const user = new User({ username, passwordHash, name });

  const savedUser = await user.save();

  response.status(201).json(savedUser);
});

usersRouter.get('/', async (_, response) => {
  const users = await User.find({});
  response.send(users);
});

module.exports = usersRouter;
