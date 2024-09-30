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

router.delete("/tasks/templates/:template_id", deleteTaskTemplate);

router.delete("/test/templates", (req, res) => {
  console.log("Test DELETE route hit");
  res.status(200).send({ message: "Test route success" });
});
module.exports = router;
