const express = require("express");
const {
  addExistingPatientToCarer,
  getCarerByUserId,
} = require("../controllers/carer.controller");
const router = express.Router();

router.patch("/carer/:carer_id/patients", addExistingPatientToCarer);

router.get("/carer/:user_id", getCarerByUserId);

module.exports = router;
