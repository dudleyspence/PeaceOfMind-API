const express = require("express");
const {
  addExistingPatientToCarer,
} = require("../controllers/carer.controller");
const router = express.Router();

router.patch("/carer/:carer_id/patients", addExistingPatientToCarer);

module.exports = router;
