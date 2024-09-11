const mongoose = require("mongoose");
const dotenv = require("dotenv");

const ENV = process.env.NODE_ENV || "development";

if (ENV !== "production") {
  dotenv.config({ path: `.env.${ENV}` });
}

console.log(`Environment: ${ENV}`);

const MONGO_URI = process.env.MONGO_URI || process.env.DATABASE_URL;

function connectDB() {
  return mongoose.connect(MONGO_URI);
}

module.exports = connectDB;
