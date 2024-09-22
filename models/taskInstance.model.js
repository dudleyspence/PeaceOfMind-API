const mongoose = require("mongoose");

const TaskInstanceSchema = new mongoose.Schema(
  {
    template: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Task_template",
      required: true,
    },
    scheduleDate: { type: Date, required: true }, // for repeating tasks this will just be set to today each time a new instance is created.
    isCompleted: { type: Boolean, default: false },
    completedAt: { type: Date },
    patient: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Patient",
      required: true,
    },
    carer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Carer",
      required: true,
    },
  },
  { timestamps: true }
);

const TaskInstance = mongoose.model("Task_instance", TaskInstanceSchema);
module.exports = TaskInstance;

/*

    - Here it was actually possible to only include patient and carer in the template as we reference the template in the instance anyway
    - However this brings more complexity when querying instances of a task
    e.g. maybe i want to search all the tasks a patient has that day and i dont want to do a join to the template etc. 

*/
