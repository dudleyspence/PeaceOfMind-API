const mongoose = require("mongoose");

for (let i = 0; i < 100; i++) {
  console.log(new mongoose.Types.ObjectId().toString());
}
