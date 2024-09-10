import app from "./app.js";
import dotenv from "dotenv";
import connectDB from "./db/connection.js";

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
