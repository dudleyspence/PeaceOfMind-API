const express = require("express");
const router = express.Router();
const {
  getPatientById,
  getPatientCarers,
  getPatientGuardians,
  getPatientComments,
  getPatientTaskTemplates,
  getPatientTaskInstances,
  addNewPatient,
  updatePatientInfo,
  getTasksForSpecificDay,
} = require("../controllers/patient.controller");

router.get("/patients/:patient_id", getPatientById);
router.get("/patients/:patient_id/carers", getPatientCarers);
router.get("/patients/:patient_id/guardians", getPatientGuardians);
router.get("/patients/:patient_id/comments", getPatientComments);
router.get("/patients/:patient_id/task-templates", getPatientTaskTemplates);
router.get("/patients/:patient_id/task-instances", getPatientTaskInstances);
router.post("/patients", addNewPatient);
router.patch("/patients/:patient_id", updatePatientInfo);
router.get("/patients/:patient_id/tasks/:isoDate", getTasksForSpecificDay);

module.exports = router;
