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

exports.updateTaskInstance = (req, res, next) => {
  const { taskinstance_id } = req.params;

  const updates = req.body;

  if (!mongoose.Types.ObjectId.isValid(taskinstance_id)) {
    return res.status(400).send({ message: "Bad Request: Invalid IDs" });
  }

  TaskInstance.findByIdAndUpdate(taskinstance_id, updates, {
    new: true,
    runValidators: true,
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

exports.deleteTaskInstance = (req, res, next) => {
  const { instance_id } = req.params;

  TaskInstance.findByIdAndDelete(instance_id)
    .then((deletedTask) => {
      if (!deletedTask) {
        return res.status(404).send({ message: "Task not found" });
      }
      res.status(200).send({ message: "Task deleted successfully" });
    })
    .catch(next);
};

exports.deleteTaskTemplate = (req, res, next) => {
  const { template_id } = req.params;

  TaskTemplate.findByIdAndDelete(template_id)
    .then((deletedTask) => {
      if (!deletedTask) {
        return res.status(404).send({ message: "Task not found" });
      }
      res.status(200).send({ message: "Task deleted successfully" });
    })
    .catch(next);
};
