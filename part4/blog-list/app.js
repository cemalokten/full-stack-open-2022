const express = require('express');
require('express-async-errors')
const cors = require('cors')
const connectDB = require('./utils/connect')
const blog = require('./controllers/blog')
const users = require('./controllers/users')
const app = express()

connectDB()

app.use(cors())
app.use(express.json())
app.use('/api/blogs', blog)
app.use('/api/users', users)

module.exports = app
