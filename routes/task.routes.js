const express = require("express");
const router = express.Router();
const {
  updateTaskTemplate,
  updateTaskInstance,
  postTask,
  deleteTaskInstance,
  deleteTaskTemplate,
} = require("../controllers/task.controller");

router.patch("/tasks/templates/:tasktemplate_id", updateTaskTemplate);

router.post("/tasks", postTask);

router.patch("/tasks/instances/:taskinstance_id", updateTaskInstance);

router.delete("/tasks/instances/:task_id", deleteTaskInstance);

router.delete("/tasks/templates/:task_id", deleteTaskTemplate);

module.exports = router;
