const Patient = require("../models/patient.model");

exports.getPatientById = (req, res, next) => {
  const { patient_id } = req.params;

  Patient.findById(patient_id)
    .then((patient) => {
      if (!patient) {
        return res.status(404).send({ message: "Patient not found" });
      }
      console.log(patient);

      res.status(200).send(patient);
    })
    .catch(next);
};
