const express = require('express');
const cors = require('cors');
const connectDB = require('./utils/connect');
const blog = require('./controllers/blog');
const users = require('./controllers/users');
const login = require('./controllers/login');

connectDB();

const app = express();

app.use(cors());
app.use(express.json());
app.use('/api/blogs', blog);
app.use('/api/users', users);
app.use('/api/login', login);

module.exports = app;
