const { Seeder } = require("mongo-seeding");
const path = require("path");
const { ENV, MONGO_URI } = require("../../config/loadEnvironment");

let dataPath;

if (ENV === "test") {
  dataPath = "../data/test-data";
} else {
  dataPath = "../data/development-data";
}

function seedData() {
  console.log("hello");
  const seeder = new Seeder({
    database: MONGO_URI,
    dropDatabase: true,
    dropCollections: true,
    removeAllDocuments: true,
    authMechanism: "SCRAM-SHA-1",
  });

  const resolvedPath = path.resolve(__dirname, dataPath);

  const collectionReadingOptions = {
    extensions: ["json"],
    ejsonParseOptions: {
      relaxed: false,
    },
    transformers: [
      Seeder.Transformers.replaceDocumentIdWithUnderscoreId,
      Seeder.Transformers.setTimestamps,
    ],
  };

  const collections = seeder.readCollectionsFromPath(
    resolvedPath,
    collectionReadingOptions
  );

  return seeder
    .import(collections)
    .then(() => {
      console.log("Seeding completed successfully!");
    })
    .catch((err) => {
      console.error("Seeding failed:", err);
    });
}

module.exports = seedData;
