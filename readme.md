# PeaceOfMind-API

The backend API for my Peace of Mind site. This will allow for passing of patient, carer and family member data between the front end and back end.

gets patient by ID

**Patients**

- Get a patient by ID
  /api/patients/:patient_id - DONE

- Get all carers associated with a single patient
  /api/patients/:patient_id/carers - DONE

- Get all comments associated with a single patient
  /api/patients/:patient_id/comments -DONE

- Get all guardians associated with a single patient
  /api/patients/:patient_id/guardians - DONE

- Get all task templates associated with a single patient
  /api/patients/:patient_id/task-templates - DONE

- Get all task templates associated with a single patient
  /api/patients/:patient_id/task-instances - DONE

**Carers**

- Get all patients associated with a single carer
  /api/carers/:carer_id/patients

**Guardians**

- Get all patients associated with a single guardian
  /api/guardians/:guardian_id/patients
