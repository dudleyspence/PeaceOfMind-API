# PeaceOfMind-API

The backend API for my Peace of Mind site. This will allow for passing of patient, carer and family member data between the front end and back end.

gets patient by ID

**Patients**

- Get a patient by ID
  /api/patients/:patient_id

- Get all carers associated with a single patient
  /api/patients/:patient_id/carers

- Get all comments associated with a single patient
  /api/patients/:patient_id/comments

- Get all guardians associated with a single patient
  /api/patients/:patient_id/guardians

- Get all guardians associated with a single patient
  /api/patients/:patient_id/guardians

**Carers**

- Get all patients associated with a single carer
  /api/carers/:carer_id/patients

**Guardians**

- Get all patients associated with a single guardian
  /api/guardians/:guardian_id/patients
