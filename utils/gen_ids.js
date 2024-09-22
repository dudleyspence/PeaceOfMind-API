const mongoose = require("mongoose");

for (let i = 0; i < 100; i++) {
  console.log(new mongoose.Types.ObjectId().toString());
}

const fs = require("fs");

// File paths
const inputFilePath =
  "../db/data/development-data/task_instances/task_instances.json"; // Replace with the path to your JSON file
const outputFilePath = "updated_task_instances.json";

// Read the JSON file
fs.readFile(inputFilePath, "utf8", (err, data) => {
  if (err) {
    console.error(`Error reading the file: ${err}`);
    return;
  }

  // Parse the JSON data
  let taskInstances;
  try {
    taskInstances = JSON.parse(data);
  } catch (error) {
    console.error(`Error parsing JSON: ${error}`);
    return;
  }

  // Replace the _id field with a valid ObjectId
  taskInstances.forEach((taskInstance) => {
    taskInstance._id.$oid = new mongoose.Types.ObjectId().toString();
  });

  // Save the updated JSON back to a new file
  fs.writeFile(
    outputFilePath,
    JSON.stringify(taskInstances, null, 2),
    "utf8",
    (err) => {
      if (err) {
        console.error(`Error writing the file: ${err}`);
      } else {
        console.log(`Updated task instances saved to ${outputFilePath}`);
      }
    }
  );
});
