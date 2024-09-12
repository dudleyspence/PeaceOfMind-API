const seedData = require("./seed.js");
const mongoose = require("mongoose");

function runSeed() {
  seedData()
    .then(() => {
      console.log("Seeding process complete.");
      return mongoose.disconnect();
    })
    .catch((error) => {
      console.error("Seeding failed:", error);
    });
}

runSeed();
