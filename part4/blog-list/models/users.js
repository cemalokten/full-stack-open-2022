const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  passwordHash: { type: String, required: true },
  name: String,
  notes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Blog'
    }
  ],
})

userSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
    delete returnedObject.passwordHash
  }
})

const getCollectionName = () => {
  const env = process.env.NODE_ENV || 'development' // Use 'development' as default
  return env === 'test' ? 'user-list-tests' : 'user-lists'
}

const User = mongoose.model(getCollectionName(), userSchema);

module.exports = User
