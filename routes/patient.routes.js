const express = require("express");
const router = express.Router();
const { getPatientById } = require("../controllers/patient.controller");

router.get("/patients/:patient_id", getPatientById);

module.exports = router;
