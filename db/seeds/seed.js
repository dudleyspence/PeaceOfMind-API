const { Seeder } = require("mongo-seeding");
const connectDB = require("../connection.js");
const dotenv = require("dotenv");
const path = require("path");
const mongoose = require("mongoose");

const ENV = process.env.NODE_ENV || "development";
dotenv.config({ path: `.env.${ENV}` });

const MONGO_URI = process.env.MONGO_URI || process.env.DATABASE_URL;

if (!MONGO_URI) {
  throw new Error("MongoDB URI is not defined in .env file");
}

let dataPath;

if (ENV === "test") {
  dataPath = "../data/test-data";
} else {
  dataPath = "../data/development-data";
}

function seedData() {
  return connectDB()
    .then(() => {
      const seeder = new Seeder({
        database: MONGO_URI,
        dropDatabase: true,
      });
      const resolvedPath = path.resolve(__dirname, dataPath);

      const collectionReadingOptions = {
        extensions: ["json"],
        ejsonParseOptions: {
          relaxed: false,
        },
        transformers: [Seeder.Transformers.replaceDocumentIdWithUnderscoreId],
      };

      const collections = seeder.readCollectionsFromPath(
        resolvedPath,
        collectionReadingOptions
      );

      return seeder.import(collections);
    })

    .then(() => {
      console.log("succesfully seeded the database");
      return mongoose.disconnect();
    })
    .then(() => {
      console.log("database connection closed");
    })
    .catch((error) => {
      console.error("error seeding database", error);
    });
}

module.exports = seedData;
