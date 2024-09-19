const express = require("express");
const router = express.Router();
const { updateTaskTemplate } = require("../controllers/task.controller");

router.patch("/tasks/templates/:tasktemplate_id", updateTaskTemplate);

module.exports = router;
