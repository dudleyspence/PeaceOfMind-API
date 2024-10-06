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
  console.log(newUser);

  newUser
    .save()
    .then(() => {
      const userId = newUser._id;
      console.log("UserID created:", userId);

      if (newUser.role === "guardian") {
        const newGuardian = new Guardian({ user: newUser._id });
        console.log("Guardian created:", newGuardian);
        newGuardian
          .save()
          .then((guardian) => {
            return guardian.populate("user");
          })
          .then((populatedGuardian) => {
            console.log("Guardian created:", populatedGuardian);
            return res.status(200).send(populatedGuardian);
          });
      } else if (newUser.role === "carer") {
        const newCarer = new Carer({ user: userId });
        newCarer
          .save()
          .then((carer) => {
            return carer.populate("user");
          })
          .then((populatedCarer) => {
            console.log("Carer created:", populatedCarer);
            return res.status(200).send(populatedCarer);
          });
      } else {
        return res.status(400).send({ message: "Error creating accound type" });
      }
    })
    .catch(next);
};

exports.getUserByFirebaseUID = (req, res, next) => {
  const { firebaseUID } = req.params;
  console.log("FirebaseUID:", firebaseUID);

  User.find({ firebaseUID: firebaseUID })
    .then((user) => {
      conole.log(user, "<<<< user");
      if (!user) {
        return res.status(404).send({ message: "User not found" });
      }

      if (user.role === "guardian") {
        return Guardian.findOne({ user: user._id })
          .populate("user")
          .populate("patients");
      }
      if (user.role === "carer") {
        return Carer.findOne({ user: user._id })
          .populate("user")
          .populate("patients");
      }
    })
    .then((populatedUser) => {
      console.log("Populated user:", populatedUser);
      return res.status(200).send(populatedUser);
    })
    .catch(next);
};
