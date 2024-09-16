const {
  Patient,
  Carer,
  Guardian,
  Comment,
  TaskTemplate,
  TaskInstance,
} = require("../models/index.model");
const mongoose = require("mongoose");

exports.addExistingPatientToCarer = (req, res, next) => {
  const { carer_id } = req.params;
  const { patient_id } = req.body;

  if (!mongoose.Types.ObjectId.isValid(carer_id)) {
    return res.status(400).send({ message: "Bad Request: Invalid Carer ID" });
  }

  if (!mongoose.Types.ObjectId.isValid(patient_id)) {
    return res.status(400).send({ message: "Bad Request: Invalid Patient ID" });
  }

  Carer.findByIdAndUpdate(
    carer_id,
    { $addToSet: { patients: patient_id } },
    { new: true, runValidators: true }
  )
    .then((updatedcarer) => {
      if (!updatedcarer) {
        return res.status(404).send({ message: "Carer not found" });
      }

      return Patient.findByIdAndUpdate(
        patient_id,
        { $addToSet: { carers: carer_id } },
        { new: true, runValidators: true }
      ).then((updatedPatient) => {
        if (!updatedPatient) {
          return res.status(404).send({ message: "Patient not found" });
        }
        return res.status(200).send(updatedcarer);
      });
    })
    .catch((err) => {
      console.error("Error updating carer or patient:", err);
      next(err);
    });
};

exports.getCarerByUserId = (req, res, next) => {
  const { user_id } = req.params;

  Carer.findOne({ user: user_id })
    .populate("user")
    .populate("patients")
    .then((carer) => {
      if (!carer) {
        return res.status(404).send({ message: "Carer not found" });
      }
      return res.status(200).send(carer);
    })
    .catch(next);
};
