/* eslint-disable no-console */
const mongoose = require('mongoose');
const config = require('./config');

const connectDB = async () => {
  try {
    const url = config.MONGODB_URI;
    mongoose.set('strictQuery', false);
    await mongoose.connect(url);
    console.log('Connected to the database');
  } catch (err) {
    console.error('Error connecting to the database:', err);
    process.exit(1);
  }
};

module.exports = connectDB;
