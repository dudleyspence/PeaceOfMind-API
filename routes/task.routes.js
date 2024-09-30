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

router.delete("/tasks/instances/:instance_id", deleteTaskInstance);

router.delete("/deleteTemplate/:template_id", deleteTaskTemplate);

router.use((req, res, next) => {
  console.log(`No route found for ${req.method} ${req.url}`);
  res.status(404).send({ message: "Route not found" });
});

module.exports = router;
