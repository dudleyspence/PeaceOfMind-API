const express = require("express");
const { addNewComment } = require("../controllers/comment.controller");
const router = express.Router();

router.post("/comments", addNewComment);

module.exports = router;
a;
