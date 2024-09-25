const Agenda = require("agenda");
const { TaskTemplate, TaskInstance } = require("../models/index.model");

const { MONGO_URI } = require("../config/loadEnvironment");

let agenda;

function initializeAgenda() {
  agenda = new Agenda({
    db: { address: MONGO_URI, collection: "agendaJobs" },
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

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

  agenda.define("create daily task instances", async (job, done) => {
    const todayStart = new Date();
    todayStart.setUTCHours(0, 0, 0, 0);

    const todayEnd = new Date(todayStart);
    todayEnd.setUTCHours(23, 59, 59, 999);

    const templates = await TaskTemplate.find({
      nextInstanceDate: {
        $gte: todayStart,
        $lt: todayEnd,
      },
      isDaySpecific: false,
    });
    for (const template of templates) {
      const newTaskInstance = new TaskInstance({
        template: template._id,
        scheduleDate: todayStart,
        isCompleted: false,
        patient: template.patient,
        carer: template.carer,
      });
      await newTaskInstance.save();
      const newNextInstanceDate = calculateNextInstanceDate(
        todayStart,
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
}

function startAgenda() {
  return agenda.start().then(() => {
    console.log("Agenda started successfully. Ready to process jobs.");

    agenda.every("0 0 * * *", "create daily task instances");
    agenda.now("create daily task instances");
  });
}

module.exports = {
  initializeAgenda,
  startAgenda,
};
