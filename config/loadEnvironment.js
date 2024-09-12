const dotenv = require("dotenv");

function getEnv() {
  const ENV = process.env.NODE_ENV || "development";
  dotenv.config({ path: `config/.env.${ENV}` });

  const MONGO_URI = process.env.MONGO_URI || process.env.DATABASE_URL;

  return { ENV, MONGO_URI };
}

module.exports = getEnv();
