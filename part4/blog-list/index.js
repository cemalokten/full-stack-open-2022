const express = require('express');
const app = express()
const cors = require('cors')
const connectDB = require('./utils/connect')
const config = require('./utils/config')
const router = require('./controllers/blog')

connectDB()

app.use(cors())
app.use(express.json())
app.use('/api', router)

app.listen(config.PORT, () => {
  console.log(`Server running on port ${config.PORT}`)
})