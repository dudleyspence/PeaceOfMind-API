const express = require("express");
const { addNewUser } = require("../controllers/user.controller");
const router = express.Router();

router.post("/user", addNewUser);

module.exports = router;
