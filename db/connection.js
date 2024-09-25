const mongoose = require("mongoose");
const { ENV, MONGO_URI } = require("../config/loadEnvironment");

console.log(`Environment: ${ENV}`);

function connectDB() {
  return mongoose
    .connect(MONGO_URI)
    .then(() => {
      console.log("Successfully connected to MongoDB");
    })
    .catch((err) => {
      console.error("Error connecting to MongoDB:", err);
    });
}

module.exports = connectDB;
