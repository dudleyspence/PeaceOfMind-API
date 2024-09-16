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
  const seeder = new Seeder({
    database: MONGO_URI,
    dropDatabase: true,
    authMechanism: "SCRAM-SHA-1",
  });
  console.log(ENV, "<<< Seed ENV");
  console.log(MONGO_URI), "Seed MONGO_URI";

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
