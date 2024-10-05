const {
  Patient,
  Carer,
  Guardian,
  Comment,
  User,
  TaskTemplate,
  TaskInstance,
} = require("../models/index.model");
const mongoose = require("mongoose");

exports.addNewUser = (req, res, next) => {
  const newUser = new User(req.body);

  newUser
    .save()
    .then(() => {
      const userId = newUser._id;

      if (newUser.type === "guardian") {
        const newGuardian = new Guardian({ user: userId });
        newGuardian
          .save()
          .populate("user")
          .then((guardianUser) => {
            return res.status(201).send(guardianUser);
          });
      } else if (newUser.type === "carer") {
        const newCarer = new Carer({ user: userId });
        newCarer
          .save()
          .populate("user")
          .then((carerUser) => {
            return res.status(201).send(carerUser);
          });
      } else {
        return res.status(400).send({ message: "Error creating accound type" });
      }
    })
    .catch(next);
};
