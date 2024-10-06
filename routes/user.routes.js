const express = require("express");
const {
  addNewUser,
  getUserByFirebaseUID,
} = require("../controllers/user.controller");
const router = express.Router();

router.post("/user", addNewUser);

router.get("/user/UID/:firebaseUID", getUserByFirebaseUID);

module.exports = router;
