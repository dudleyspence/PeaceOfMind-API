const mongoose = require("mongoose");

const fs = require("fs");
const data = JSON.parse(
  fs.readFileSync(
    "../db/data/development-data/task_instances/task_instances.json",
    "utf8"
  )
);
data.forEach((document) => {
  document._id = { $oid: new mongoose.Types.ObjectId().toString() };
});
fs.writeFileSync("modified_data.json", JSON.stringify(data, null, 2));
