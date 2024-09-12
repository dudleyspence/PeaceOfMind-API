const mongoose = require("mongoose");
const getEnv = require("../loadEnvironment");

const { ENV, MONGO_URI } = getEnv();

console.log(`Environment: ${ENV}`);

function connectDB() {
  return mongoose.connect(MONGO_URI);
}

module.exports = connectDB;
