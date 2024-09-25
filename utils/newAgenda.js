const dotenv = require("dotenv");
const Agenda = require("agenda");

const ENV = process.env.NODE_ENV || "development";

if (ENV !== "production") {
  dotenv.config({ path: `.env.${ENV}` });
}

const mongoConnectionString = process.env.MONGO_URI || process.env.DATABASE_URL;

const agenda = new Agenda({ db: { address: mongoConnectionString } });

agenda.define("welcomeMessage", () => {
  console.log("Sending a welcome message every few seconds");
});

function calculateNextInstanceDate(currentDate, repeatInterval) {
  const nextDate = new Date(currentDate);

  switch (repeatInterval) {
    case "Daily":
      nextDate.setDate(nextDate.getDate() + 1);
      break;
    case "Weekly":
      nextDate.setDate(nextDate.getDate() + 7);
      break;
    case "Biweekly":
      nextDate.setDate(nextDate.getDate() + 14);
      break;
    case "Monthly":
      nextDate.setMonth(nextDate.getMonth() + 1);
      break;
    case "None":
      return null;
    default:
      return nextDate;
  }

  return nextDate;
}

agenda.define("create daily task instances", async (job) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);

  const templates = await TaskTemplate.find({ nextInstanceDate: tomorrow });
  for (const template of templates) {
    const newTaskInstance = new TaskInstance({
      template: template._id,
      scheduleDate: today,
      isCompleted: false,
      patient: template.patient,
      carer: template.carer,
    });
    await newTaskInstance.save();
    const newNextInstanceDate = calculateNextInstanceDate(
      today,
      template.repeatInterval
    );

    if (
      template.repeatEndDate &&
      newNextInstanceDate > template.repeatEndDate
    ) {
      template.nextInstanceDate = null;
    } else {
      template.nextInstanceDate = newNextInstanceDate;
    }

    await template.save();
  }
  done();
});

agenda.now("create daily task instances");
agenda.every("0 0 * * *", "create daily task instances");

module.exports = agenda;
