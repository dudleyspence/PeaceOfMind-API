const {
  Patient,
  Carer,
  Guardian,
  Comment,
  TaskTemplate,
  TaskInstance,
} = require("../models/index.model");
const mongoose = require("mongoose");

exports.addExistingPatientToGuardian = (req, res, next) => {
  const { guardian_id } = req.params;
  const { patient_id } = req.body;

  if (!mongoose.Types.ObjectId.isValid(guardian_id)) {
    return res
      .status(400)
      .send({ message: "Bad Request: Invalid Guardian ID" });
  }

  if (!mongoose.Types.ObjectId.isValid(patient_id)) {
    return res.status(400).send({ message: "Bad Request: Invalid Patient ID" });
  }

  Guardian.findByIdAndUpdate(
    guardian_id,
    { $addToSet: { patients: patient_id } },
    { new: true, runValidators: true }
  )
    .then((updatedGuardian) => {
      if (!updatedGuardian) {
        return res.status(404).send({ message: "Guardian not found" });
      }

      return Patient.findByIdAndUpdate(
        patient_id,
        { $addToSet: { guardians: guardian_id } },
        { new: true, runValidators: true }
      ).then((updatedPatient) => {
        if (!updatedPatient) {
          return res.status(404).send({ message: "Patient not found" });
        }
        return res.status(200).send(updatedGuardian);
      });
    })
    .catch((err) => {
      console.error("Error updating guardian or patient:", err);
      next(err);
    });
};

exports.getGardianByUserId = (req, res, next) => {
  const { user_id } = req.params;

  Guardian.find({ user: user_id })
    .then((guardian) => {
      if (guardian.length === 0) {
        return res.status(404).send({ message: "Guardian not found" });
      }
      return res.status(200).send(guardian[0]);
    })
    .catch(next);
};
