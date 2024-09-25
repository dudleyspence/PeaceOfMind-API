const app = require("./app.js");
const dotenv = require("dotenv");
const connectDB = require("./db/connection.js");
const { initializeAgenda, startAgenda } = require("./utils/newAgenda.js");

dotenv.config({ path: `./config/.env.PORT` });

const PORT = process.env.PORT || 9090;

connectDB()
  .then(() => {
    console.log("connected to the database");
    initializeAgenda();
    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
    return startAgenda();
  })
  .then(() => {
    console.log("Agenda started and initial job triggered.");
  })
  .catch((error) => {
    console.error("Failed to connect to the database. Server not started.");
    console.error(error);
  });
