const express = require("express");
const router = express.Router();
const {
  getPatientById,
  getPatientComments,
  getPatientTaskTemplates,
  getPatientTaskInstances,
  addNewPatient,
  updatePatientInfo,
  getTasksForSpecificDay,
  getScheduledAppointments,
  getTodaysProgress,
} = require("../controllers/patient.controller");

router.get("/patients/:patient_id", getPatientById);

router.get("/patients/:patient_id/comments", getPatientComments);
router.get("/patients/:patient_id/task-templates", getPatientTaskTemplates);
router.get("/patients/:patient_id/task-instances", getPatientTaskInstances);
router.post("/patients", addNewPatient);
router.patch("/patients/:patient_id", updatePatientInfo);
router.get("/patients/:patient_id/tasks/:isoDate", getTasksForSpecificDay);
router.get("/patients/:patient_id/todays-progress", getTodaysProgress);

router.get("/patients/:patient_id/scheduled-tasks", getScheduledAppointments);

module.exports = router;
