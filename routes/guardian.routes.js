const express = require("express");
const {
  addExistingPatientToGuardian,
  getGardianByUserId,
} = require("../controllers/guardian.controller");
const router = express.Router();

router.patch("/guardian/:guardian_id/patients", addExistingPatientToGuardian);

router.get("/guardian/:user_id", getGardianByUserId);

module.exports = router;
