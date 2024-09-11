const seedData = require("./seed.js");

function runSeed() {
  seedData()
    .then(() => {
      console.log("Seeding process complete.");
    })
    .catch((error) => {
      console.error("Seeding failed:", error);
    });
}

runSeed();
