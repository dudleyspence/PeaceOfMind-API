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

exports.updateScheduleTask = (req, res, next) => {
  const { tasktemplate_id, taskinstance_id } = req.params;
  console.log(tasktemplate_id, taskinstance_id);

  const { templateUpdate, instanceUpdate } = req.body;

  console.log(templateUpdate);
  console.log(instanceUpdate);

  if (
    !mongoose.Types.ObjectId.isValid(taskinstance_id) ||
    !mongoose.Types.ObjectId.isValid(tasktemplate_id)
  ) {
    return res.status(400).send({ message: "Bad Request: Invalid IDs" });
  }

  TaskTemplate.findByIdAndUpdate(tasktemplate_id, templateUpdate, {
    new: true,
    runValidators: true,
  })
    .then((updatedTemplate) => {
      if (!updatedTemplate) {
        return res.status(404).send({ message: "Task Template not found" });
      }
      return TaskInstance.findByIdAndUpdate(taskinstance_id, instanceUpdate, {
        new: true,
        runValidators: true,
      }).populate("template");
    })
    .then((updatedInstance) => {
      if (!updatedInstance) {
        return res.status(404).send({ message: "Task Instance not found" });
      }
      res.status(200).send(updatedInstance);
    })
    .catch(next);
};

exports.postTask = (req, res, next) => {
  const task = req.body;

  const taskTemplate = task.taskTemplate;
  const newTaskTemplate = new TaskTemplate(taskTemplate);

  newTaskTemplate.save().then((template) => {
    const templateID = template._id;
    if (template.isDaySpecific) {
      const taskInstance = task.taskInstance;
      taskInstance.template = templateID;

      const newTaskInstance = new TaskInstance(taskInstance);

      newTaskInstance.save().then((instance) => {
        return res.status(201).send(instance.populate("template"));
      });
    } else {
      return res.status(201).send(template);
    }
  });
};
