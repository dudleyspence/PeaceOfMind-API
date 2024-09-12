import dotenv from "dotenv";
import Agenda from "agenda";

const ENV = process.env.NODE_ENV || "development";

if (ENV !== "production") {
  dotenv.config({ path: `.env.${ENV}` });
}

const mongoConnectionString = process.env.MONGO_URI || process.env.DATABASE_URL;

const agenda = new Agenda({ db: { address: mongoConnectionString } });

agenda.define("welcomeMessage", () => {
  console.log("Sending a welcome message every few seconds");
});

await agenda.start();

await agenda.every("1 day", "welcomeMessage");
