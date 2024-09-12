const app = require("./app.js");
const dotenv = require("dotenv");
const connectDB = require("./db/connection.js");

dotenv.config();

const PORT = process.env.PORT || 9090;

connectDB()
  .then(() => {
    console.log("connected to the database");
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("Failed to connect to the database. Server not started.");
    console.error(error);
  });
