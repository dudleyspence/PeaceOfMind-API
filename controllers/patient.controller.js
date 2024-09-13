const {
  Patient,
  Carer,
  Guardian,
  Comment,
  TaskTemplate,
  TaskInstance,
} = require("../models/index.model");
const mongoose = require("mongoose");

exports.getPatientById = (req, res, next) => {
  const { patient_id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(patient_id)) {
    return res.status(400).send({ message: "Bad Request" });
  }

  Patient.findById(patient_id)
    .then((patient) => {
      if (!patient) {
        return res.status(404).send({ message: "Patient not found" });
      }

      res.status(200).send(patient);
    })
    .catch(next);
};

exports.getPatientCarers = (req, res, next) => {
  const { patient_id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(patient_id)) {
    return res.status(400).send({ message: "Bad Request" });
  }

  Patient.findById(patient_id)
    .then((patient) => {
      if (!patient) {
        return res.status(404).send({ message: "Patient not found" });
      }

      const carerIds = patient.carers;
      if (carerIds.length === 0) {
        return res.status(200).send([]);
      }

      return Carer.find({ _id: { $in: carerIds } });
    })
    .then((carers) => {
      return res.status(200).send(carers);
    })
    .catch(next);
};

exports.getPatientGuardians = (req, res, next) => {
  const { patient_id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(patient_id)) {
    return res.status(400).send({ message: "Bad Request" });
  }

  Patient.findById(patient_id)
    .then((patient) => {
      if (!patient) {
        return res.status(404).send({ message: "Patient not found" });
      }

      const guardianIds = patient.guardians;
      if (guardianIds.length === 0) {
        return res.status(200).send([]);
      }

      return Guardian.find({ _id: { $in: guardianIds } });
    })
    .then((guardians) => {
      return res.status(200).send(guardians);
    })
    .catch(next);
};

exports.getPatientComments = (req, res, next) => {
  const { patient_id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(patient_id)) {
    return res.status(400).send({ message: "Bad Request" });
  }

  Patient.findById(patient_id)
    .then((patient) => {
      if (!patient) {
        return res.status(404).send({ message: "Patient not found" });
      }
      return Comment.find({ patient: patient_id });
    })
    .then((comments) => {
      if (comments.length === 0) {
        return res.status(200).send([]);
      } else {
        return res.status(200).send(comments);
      }
    })
    .catch(next);
};

exports.getPatientComments = (req, res, next) => {
  const { patient_id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(patient_id)) {
    return res.status(400).send({ message: "Bad Request" });
  }

  Patient.findById(patient_id)
    .then((patient) => {
      if (!patient) {
        return res.status(404).send({ message: "Patient not found" });
      }
      return Comment.find({ patient: patient_id });
    })
    .then((comments) => {
      if (comments.length === 0) {
        return res.status(200).send([]);
      } else {
        return res.status(200).send(comments);
      }
    })
    .catch(next);
};

exports.getPatientTaskTemplates = (req, res, next) => {
  const { patient_id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(patient_id)) {
    return res.status(400).send({ message: "Bad Request" });
  }

  Patient.findById(patient_id)
    .then((patient) => {
      if (!patient) {
        return res.status(404).send({ message: "Patient not found" });
      }
      return TaskTemplate.find({ patient: patient_id });
    })
    .then((TaskTemplate) => {
      if (TaskTemplate.length === 0) {
        return res.status(200).send([]);
      } else {
        return res.status(200).send(TaskTemplate);
      }
    })
    .catch(next);
};

exports.getPatientTaskInstances = (req, res, next) => {
  const { patient_id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(patient_id)) {
    return res.status(400).send({ message: "Bad Request" });
  }

  Patient.findById(patient_id)
    .then((patient) => {
      if (!patient) {
        return res.status(404).send({ message: "Patient not found" });
      }
      return TaskInstance.find({ patient: patient_id });
    })
    .then((TaskInstance) => {
      if (TaskInstance.length === 0) {
        return res.status(200).send([]);
      } else {
        return res.status(200).send(TaskInstance);
      }
    })
    .catch(next);
};
