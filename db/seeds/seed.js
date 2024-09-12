const { Seeder } = require("mongo-seeding");
const dotenv = require("dotenv");
const path = require("path");

const ENV = process.env.NODE_ENV || "development";
dotenv.config({ path: `.env.${ENV}` });

const MONGO_URI = process.env.MONGO_URI || process.env.DATABASE_URL;

let dataPath;

if (ENV === "test") {
  dataPath = "../data/test-data";
} else {
  dataPath = "../data/development-data";
}

function seedData() {
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
}

module.exports = seedData;
