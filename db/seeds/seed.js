const { Seeder } = require("mongo-seeding");
const path = require("path");
const getEnv = require("../../loadEnvironment");

const { ENV, MONGO_URI } = getEnv();

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
