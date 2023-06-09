const express = require('express');
require('express-async-errors')
const cors = require('cors')
const connectDB = require('./utils/connect')
const router = require('./controllers/blog')
const app = express()

connectDB()

app.use(cors())
app.use(express.json())
app.use('/api', router)

module.exports = app
