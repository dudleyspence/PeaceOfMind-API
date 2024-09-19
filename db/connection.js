const mongoose = require("mongoose");
const { ENV, MONGO_URI } = require("../config/loadEnvironment");

console.log(`Environment: ${ENV}`);

function connectDB() {
  console.log(MONGO_URI);
  return mongoose.connect(MONGO_URI);
}

module.exports = connectDB;
