# PeaceOfMind-API

The backend API for my Peace of Mind site. This will allow for passing of patient, carer and family member data between the front end and back end.

gets patient by ID

**Patients**

- Get a patient by ID
  GET /api/patients/:patient_id - DONE

- Get all carers associated with a single patient
  GET /api/patients/:patient_id/carers - DONE

- Get all comments associated with a single patient
  GET /api/patients/:patient_id/comments -DONE

- Get all guardians associated with a single patient
  GET /api/patients/:patient_id/guardians - DONE

- Get all task templates associated with a single patient
  GET /api/patients/:patient_id/task-templates - DONE

- Get all task templates associated with a single patient
  GET /api/patients/:patient_id/task-instances - DONE

- create a new patient
  POST /api/patients - DONE

- updatePatientInfo
  PATCH patients/:patient_id - DONE

**Carers**

- Get all patients associated with a single carer
  GET /api/carers/:carer_id/patients

- Add existing patient to a carer (and update the patient to include the carer)
  PATCH /api/carers/:carer_id/patients - DONE

**Guardians**

- Get all patients associated with a single guardian
  /api/guardians/:guardian_id/patients

- Add existing patient to a guardian (and update the guardian to include the carer)
  PATCH /api/guardians/:guardian_id/patients - DONE

**Still need to do:**

- update guardian info
  PATCH /api/guardians/:guardian_id

- update carer info
  PATCH /api/carers/:carer_id

- Create dayspecific task
  POST /api/patient/:patient_id/tasks/one-time

- remove one-time task (removes the instance and the template)
- remove one instance of a repeating task (remove only instance)
- fully remove a repeating task (remove instance and template)

  DELETE /api/tasks/:taskTemplate_id/:taskInstance_id

- Create repeating task
  POST /api/patient/:patient_id/tasks/repeating

- add queries to GET tasks
  e.g. ?completed=false

-
