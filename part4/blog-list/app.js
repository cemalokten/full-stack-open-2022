const express = require('express');
const cors = require('cors');
const connectDB = require('./utils/connect');
const blog = require('./controllers/blog');
const users = require('./controllers/users');
const login = require('./controllers/login');
const { decryptToken, userExtractor } = require('./utils/middleware');

connectDB();

const app = express();

app.use(decryptToken);

app.use(cors());
app.use(express.json());
app.use('/api/blogs', userExtractor, blog);
app.use('/api/users', users);
app.use('/api/login', login);

module.exports = app;
