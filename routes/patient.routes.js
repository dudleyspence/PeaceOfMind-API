const express = require("express");
const router = express.Router();
const {
  getPatientById,
  getPatientCarers,
  getPatientGuardians,
  getPatientComments,
  getPatientTaskTemplates,
  getPatientTaskInstances,
} = require("../controllers/patient.controller");

router.get("/patients/:patient_id", getPatientById);
router.get("/patients/:patient_id/carers", getPatientCarers);
router.get("/patients/:patient_id/guardians", getPatientGuardians);
router.get("/patients/:patient_id/comments", getPatientComments);
router.get("/patients/:patient_id/task-templates", getPatientTaskTemplates);
router.get("/patients/:patient_id/task-instances", getPatientTaskInstances);

module.exports = router;
