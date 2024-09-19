const mongoose = require("mongoose");

const TaskTemplateSchema = mongoose.Schema(
  {
    text: { type: String, required: true },
    isDaySpecific: { type: Boolean, default: false },
    category: {
      type: String,
      enum: ["Hygiene", "Meals", "Medical", "Additional", "Exercise"],
      required: function () {
        return !this.isDaySpecific;
      },
    },
    repeatInterval: {
      type: String,
      enum: ["Daily", "Weekly", "Biweekly", "Monthly", "None"],
      default: "None",
    },
    repeatEndDate: { type: Date },
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

const TaskTemplate = mongoose.model("Task_template", TaskTemplateSchema);
module.exports = TaskTemplate;

// This is the template for each task and it defines the structure of the task and its recurrence behavior it doenst include any information about an instance of the task such as completion etc.
// Just think that each day when we want a fresh set of untouched daily tasks we need a template for these
