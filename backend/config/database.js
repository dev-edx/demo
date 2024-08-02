const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

const connectToDataBase = async () => {
  try {
    mongoose.connect(process.env.DB, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Connected to the database');
  } catch {
    console.log('catch');
  }
};

module.exports = connectToDataBase;
