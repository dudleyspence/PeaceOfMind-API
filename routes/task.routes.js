const express = require("express");
const router = express.Router();
const {
  updateTaskTemplate,
  postTask,
} = require("../controllers/task.controller");

router.patch("/tasks/templates/:tasktemplate_id", updateTaskTemplate);

router.post("/tasks", postTask);

module.exports = router;
