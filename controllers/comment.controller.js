const {
  Patient,
  Carer,
  Guardian,
  Comment,
  TaskTemplate,
  TaskInstance,
} = require("../models/index.model");
const mongoose = require("mongoose");

exports.addNewComment = (req, res, next) => {
  const newComment = new Comment(req.body);
  newComment
    .save()
    .populate("author")
    .populate({
      path: "author",
      populate: {
        path: "user",
      },
    })
    .then((comment) => {
      return res.status(201).send(comment);
    })
    .catch((err) => {
      if (err.name === "ValidationError") {
        return res.status(400).send({
          message: "Validation Error: Some of the data is missing or incorrect",
        });
      }
      next(err);
    });
};
