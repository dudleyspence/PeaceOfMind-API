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

      if (newUser.role === "guardian") {
        const newGuardian = new Guardian({ user: userId });
        newGuardian.save().then((guardian) => {
          console.log(guardian);
          console.log(guardian.populate("user"));
          return res.status(200).send(guardian.populate("user"));
        });
      } else if (newUser.role === "carer") {
        const newCarer = new Carer({ user: userId });
        newCarer.save().then((carer) => {
          return res.status(200).send(carer.populate("user"));
        });
      } else {
        return res.status(400).send({ message: "Error creating accound type" });
      }
    })
    .catch(next);
};
