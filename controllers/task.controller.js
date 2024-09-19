const {
  Patient,
  Carer,
  Guardian,
  Comment,
  TaskTemplate,
  TaskInstance,
} = require("../models/index.model");
const mongoose = require("mongoose");

exports.updateTaskTemplate = (req, res, next) => {
  const { tasktemplate_id } = req.params;
  const updates = req.body;
  if (!mongoose.Types.ObjectId.isValid(tasktemplate_id)) {
    return res.status(400).send({ message: "Bad Request" });
  }
  TaskTemplate.findByIdAndUpdate(tasktemplate_id, updates, {
    new: true,
    runValidators: true,
  })
    .then((updatedTask) => {
      if (!updatedTask) {
        return res.status(404).send({ message: "Task not found" });
      }
      res.status(200).send(updatedTask);
    })
    .catch(next);
};
