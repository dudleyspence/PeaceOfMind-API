const {
  Patient,
  Carer,
  Guardian,
  Comment,
  TaskTemplate,
  TaskInstance,
} = require("../models/index.model");
const mongoose = require("mongoose");
const { getAge } = require("../utils/get_age");
const { formatISO } = require("date-fns");

exports.getPatientById = (req, res, next) => {
  const { patient_id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(patient_id)) {
    return res.status(400).send({ message: "Bad Request" });
  }

  Patient.findById(patient_id)
    .populate({
      path: "carers",
      populate: {
        path: "user",
      },
    })
    .populate({
      path: "guardians",
      populate: {
        path: "user",
      },
    })
    .then((patient) => {
      if (!patient) {
        return res.status(404).send({ message: "Patient not found" });
      }
      const age = getAge(patient.dob);
      const patientObj = patient.toObject();
      patientObj.age = age;
      res.status(200).send(patientObj);
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
      return Comment.find({ patient: patient_id })
        .populate("author")
        .populate({
          path: "author",
          populate: {
            path: "user",
          },
        });
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

exports.addNewPatient = (req, res, next) => {
  const newPatient = new Patient(req.body);
  newPatient
    .save()
    .then((patient) => {
      const guardianId = patient.guardians[0];

      return Guardian.findByIdAndUpdate(
        guardianId,
        { $addToSet: { patients: patient._id } },
        { new: true }
      )
        .then((updatedGuardian) => {
          if (!updatedGuardian) {
            return res.status(404).send({ message: "Guardian not found" });
          }
          return res.status(201).send(patient);
        })
        .catch(next);
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

exports.updatePatientInfo = (req, res, next) => {
  const { patient_id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(patient_id)) {
    return res.status(400).send({ message: "Bad Request" });
  }
  const updates = req.body;

  Patient.findByIdAndUpdate(patient_id, updates, {
    new: true,
    runValidators: true,
  })
    .then((updatedPatient) => {
      if (!updatedPatient) {
        return res.status(404).send({ message: "Patient not found" });
      }
      res.status(200).send(updatedPatient);
    })
    .catch(next);
};

exports.getTasksForSpecificDay = (req, res, next) => {
  const { patient_id, isoDate } = req.params;

  if (!mongoose.Types.ObjectId.isValid(patient_id)) {
    return res.status(400).send({ message: "Bad Request: Invalid Patient ID" });
  }

  const localDate = new Date(isoDate);

  localDate.setUTCHours(0, 0, 0, 0);
  const dayStart = new Date(localDate);

  localDate.setUTCHours(23, 59, 59, 999);
  const dayEnd = new Date(localDate);

  TaskInstance.find({
    patient: patient_id,
    scheduleDate: {
      $gte: dayStart,
      $lt: dayEnd,
    },
  })
    .populate("template")
    .then((tasks) => {
      res.status(200).send(tasks);
    })
    .catch(next);
};

exports.getScheduledAppointments = (req, res, next) => {
  const { patient_id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(patient_id)) {
    return res.status(400).send({ message: "Bad Request: Invalid Patient ID" });
  }

  const todayStart = new Date();
  todayStart.setUTCHours(0, 0, 0, 0);

  TaskInstance.find({
    patient: patient_id,
    scheduleDate: { $gte: todayStart },
  })
    .populate("template")
    .then((instances) => {
      const filteredInstances = instances.filter(
        (instance) => instance.template.isDaySpecific === true
      );

      return res.status(200).send(filteredInstances);
    })
    .catch(next);
};

exports.getTodaysProgress = (req, res, next) => {
  const { patient_id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(patient_id)) {
    return res.status(400).send({ message: "Bad Request: Invalid Patient ID" });
  }

  const todayStart = new Date();
  todayStart.setUTCHours(0, 0, 0, 0);

  const todayEnd = new Date(todayStart);
  todayEnd.setUTCHours(23, 59, 59, 999);

  TaskInstance.find({
    patient: patient_id,
    scheduleDate: {
      $gte: todayStart,
      $lt: todayEnd,
    },
  })
    .then((tasks) => {
      const total = tasks.length;
      const completed = tasks.filter((task) => task.isCompleted).length;
      const progress = total > 0 ? (completed / total) * 100 : 0;
      return res.status(200).send({ progress });
    })
    .catch(next);
};
