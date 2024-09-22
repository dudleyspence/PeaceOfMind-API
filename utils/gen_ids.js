const mongoose = require("mongoose");

const fs = require("fs");
const data = JSON.parse(
  fs.readFileSync(
    "../db/data/development-data/task_instances/task_instances.json",
    "utf8"
  )
);
let count = 0;
data.forEach((document) => {
  count++;
});
console.log(count);
