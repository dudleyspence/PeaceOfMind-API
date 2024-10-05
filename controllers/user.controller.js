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
        newGuardian
          .save()
          .then((guardian) => {
            return guardian.populate("user");
          })
          .then((populatedGuardianWithUser) => {
            console.log("Guardian created:", populatedGuardianWithUser);
            return populatedGuardianWithUser.populate("patients");
          })
          .then((populatedGuardianWithPatients) => {
            console.log("Guardian created:", populatedGuardianWithPatients);
            return res.status(200).send(populatedGuardianWithPatients);
          });
      } else if (newUser.role === "carer") {
        const newCarer = new Carer({ user: userId });
        newCarer
          .save()
          .then((carer) => {
            return carer.populate("user");
          })
          .then((populatedCarerWithUser) => {
            return populatedCarerWithUser.populate("patients");
          })
          .then((populatedCarerWithPatients) => {
            console.log("Carer created:", populatedCarerWithPatients);

            return res.status(200).send(populatedCarerWithPatients);
          });
      } else {
        return res.status(400).send({ message: "Error creating accound type" });
      }
    })
    .catch(next);
};
