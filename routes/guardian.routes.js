const express = require("express");
const {
  addExistingPatientToGuardian,
} = require("../controllers/guardian.controller");
const router = express.Router();

router.patch("/guardian/:guardian_id/patients", addExistingPatientToGuardian);

module.exports = router;
