const express = require("express");
const router = express.Router();
const {
  updateTaskTemplate,
  updateScheduleTask,
  postTask,
} = require("../controllers/task.controller");

router.patch("/tasks/templates/:tasktemplate_id", updateTaskTemplate);

router.post("/tasks", postTask);

router.patch(
  "/tasks/scheduled/:tasktemplate_id/:taskinstance_id",
  updateScheduleTask
);

module.exports = router;
