process.env.NODE_ENV = "test";

const seedData = require("../db/seeds/seed");
const mongoose = require("mongoose");
const request = require("supertest");
const app = require("../app");
const connectDB = require("../db/connection");

beforeAll(async () => {
  await connectDB();
  await seedData();
});

afterAll(async () => {
  await mongoose.disconnect();
});

test("Sample test to ensure tests are working", () => {
  expect(true).toBe(true);
});

describe("app", () => {
  describe("404: URL not found", () => {
    test("when given an endpoint that isnt in app.js, returns 'Not Found!", () => {
      return request(app)
        .get("/api/incorrect-url")
        .expect(404)
        .then((response) => {
          expect(response.body.msg).toBe("Not Found!");
        });
    });
  });

  describe("Patient", () => {
    describe("/api/patients", () => {
      describe("POST", () => {
        test("201: creates a new patient and returns the patient object", () => {
          const newPatient = {
            name: "John Doe",
            about: "John is a nice man who enjoys gardening and sudoku",
            phone: "+447889622311",
            dob: "1944-09-18T12:00:00Z",
            guardians: ["66e31b0dcdd5353bc16957c3"],
            carers: [],
          };
          return request(app)
            .post("/api/patients")
            .send(newPatient)
            .expect(201)
            .then(({ body }) => {
              expect(body).toMatchObject({
                _id: expect.any(String),
                name: newPatient.name,
                guardians: expect.any(Array),
                carers: expect.any(Array),
              });
            });
        });
        test("400: error if no guardians are provided", () => {
          const newPatient = {
            name: "test man",
            description: "testing",
            age: "45",
            guardians: [],
            carers: [],
          };
          return request(app)
            .post("/api/patients")
            .send(newPatient)
            .expect(400)
            .then(({ body }) => {
              expect(body.message).toBe(
                "Validation Error: Some of the data is missing or incorrect"
              );
            });
        });
        test("400: returns error when given invalid data types", () => {
          const invalidPatient = {
            age: "invalid_age",
            guardians: ["66e31b0dcdd5353bc16957c3"],
          };

          return request(app)
            .post("/api/patients")
            .send(invalidPatient)
            .expect(400)
            .then(({ body }) => {
              expect(body.message).toBe(
                "Validation Error: Some of the data is missing or incorrect"
              );
            });
        });
      });
    });
    describe("/api/patients/:patient_id", () => {
      describe("GET", () => {
        test("200: returns patient when given patient id", () => {
          return request(app)
            .get("/api/patients/66e31b0dcdd5353bc16957c5")
            .expect(200)
            .then(({ body }) => {
              expect(body).toMatchObject({
                _id: expect.any(String),
                name: expect.any(String),
                age: expect.any(Number),
                address: expect.any(String),
                profileImageURL: expect.any(String),
                guardians: expect.any(Array),
                carers: expect.any(Array),
              });
            });
        });
        test("400: Returns not found when given a patient_id that isnt valid", () => {
          return request(app)
            .get("/api/patients/notreal-id")
            .expect(400)
            .then(({ body }) => {
              expect(body.message).toBe("Bad Request");
            });
        });
        test("404: Returns not found when given a patient_id that is valid but the patient doesnt exist", () => {
          return request(app)
            .get("/api/patients/66e31b0dcdd5353bc16958a3")
            .expect(404)
            .then(({ body }) => {
              expect(body.message).toBe("Patient not found");
            });
        });
      });
      describe("PATCH", () => {
        test("200: returns updated patient", () => {
          const patientUpdate = { address: "123 Spring Lane, Ls176z1" };
          return request(app)
            .patch("/api/patients/66e31b0dcdd5353bc16957c5")
            .send(patientUpdate)
            .expect(200)
            .then(({ body }) => {
              expect(body).toMatchObject({
                _id: expect.any(String),
                name: expect.any(String),
                address: "123 Spring Lane, Ls176z1",
                guardians: expect.any(Array),
                carers: expect.any(Array),
              });
            });
        });
      });
    });

    describe("/api/patients/:patient_id/carers", () => {
      describe("GET", () => {
        test("200: returns patients carers when given patient id", () => {
          return request(app)
            .get("/api/patients/66e31b0dcdd5353bc16957c5/carers")
            .expect(200)
            .then(({ body }) => {
              body.forEach((carer) => {
                expect(carer).toMatchObject({
                  _id: expect.any(String),
                  user: expect.any(String),
                  phone: expect.any(String),
                  address: expect.any(String),
                  patients: expect.any(Array),
                });
              });
            });
        });
        test("400: Returns not found when given a patient_id that isnt valid", () => {
          return request(app)
            .get("/api/patients/notreal-id/carers")
            .expect(400)
            .then(({ body }) => {
              expect(body.message).toBe("Bad Request");
            });
        });
        test("404: Returns not found when given a patient_id that is valid but the patient doesnt exist", () => {
          return request(app)
            .get("/api/patients/66e31b0dcdd5353bc16958a3/carers")
            .expect(404)
            .then(({ body }) => {
              expect(body.message).toBe("Patient not found");
            });
        });
      });
    });

    describe("/api/patients/:patient_id/guardians", () => {
      describe("GET", () => {
        test("200: returns patients guardians when given patient id", () => {
          return request(app)
            .get("/api/patients/66e31b0dcdd5353bc16957c5/guardians")
            .expect(200)
            .then(({ body }) => {
              body.forEach((guardian) => {
                expect(guardian).toMatchObject({
                  _id: expect.any(String),
                  user: expect.any(String),
                  phone: expect.any(String),
                  patients: expect.any(Array),
                });
              });
            });
        });
        test("400: Returns not found when given a patient_id that isnt valid", () => {
          return request(app)
            .get("/api/patients/notreal-id/guardians")
            .expect(400)
            .then(({ body }) => {
              expect(body.message).toBe("Bad Request");
            });
        });
        test("404: Returns not found when given a patient_id that is valid but the patient doesnt exist", () => {
          return request(app)
            .get("/api/patients/66e31b0dcdd5353bc16958a3/guardians")
            .expect(404)
            .then(({ body }) => {
              expect(body.message).toBe("Patient not found");
            });
        });
      });
    });

    describe("/api/patients/:patient_id/comments", () => {
      describe("GET", () => {
        test("200: returns all comments for a patient when given patient id", () => {
          return request(app)
            .get("/api/patients/66e31b0dcdd5353bc16957c5/comments")
            .expect(200)
            .then(({ body }) => {
              body.forEach((comments) => {
                expect(comments).toMatchObject({
                  _id: expect.any(String),
                  text: expect.any(String),
                  author: expect.any(String),
                  authorType: expect.any(String),
                  patient: expect.any(String),
                });
              });
            });
        });
        test("400: Returns not found when given a patient_id that isnt valid", () => {
          return request(app)
            .get("/api/patients/notreal-id/comments")
            .expect(400)
            .then(({ body }) => {
              expect(body.message).toBe("Bad Request");
            });
        });
        test("404: Returns not found when given a patient_id that is valid but the patient doesnt exist", () => {
          return request(app)
            .get("/api/patients/66e31b0dcdd5353bc16958a3/comments")
            .expect(404)
            .then(({ body }) => {
              expect(body.message).toBe("Patient not found");
            });
        });
      });
    });

    describe("/api/patients/:patient_id/task-templates", () => {
      describe("GET", () => {
        test("200: returns all task templates for a patient when given patient id", () => {
          return request(app)
            .get("/api/patients/66e31b0dcdd5353bc16957c5/task-templates")
            .expect(200)
            .then(({ body }) => {
              body.forEach((taskTemplate) => {
                expect(taskTemplate).toMatchObject({
                  _id: expect.any(String),
                  text: expect.any(String),
                  isDaySpecific: expect.any(Boolean),
                  category: expect.stringMatching(
                    /^(Hygiene|Meals|Medical|Additional|Exercise)$/
                  ),
                  repeatInterval: expect.stringMatching(
                    /^(Daily|Weekly|Biweekly|Monthly|None)$/
                  ),
                  patient: expect.any(String),
                  carer: expect.any(String),
                });
              });
            });
        });
        test("400: Returns not found when given a patient_id that isnt valid", () => {
          return request(app)
            .get("/api/patients/notreal-id/task-templates")
            .expect(400)
            .then(({ body }) => {
              expect(body.message).toBe("Bad Request");
            });
        });
        test("404: Returns not found when given a patient_id that is valid but the patient doesnt exist", () => {
          return request(app)
            .get("/api/patients/66e31b0dcdd5353bc16958a3/task-templates")
            .expect(404)
            .then(({ body }) => {
              expect(body.message).toBe("Patient not found");
            });
        });
      });
    });

    describe("/api/patients/:patient_id/task-instances", () => {
      describe("GET", () => {
        test("200: returns all task instances for a patient when given patient id", () => {
          return request(app)
            .get("/api/patients/66e31b0dcdd5353bc16957c5/task-instances")
            .expect(200)
            .then(({ body }) => {
              body.forEach((taskInstance) => {
                expect(taskInstance).toMatchObject({
                  _id: expect.any(String),
                  template: expect.any(String),
                  scheduleDate: expect.any(String),
                  isCompleted: expect.any(Boolean),
                  completedAt: expect.any(String),
                  patient: expect.any(String),
                  carer: expect.any(String),
                });
              });
            });
        });
        test("400: Returns not found when given a patient_id that isnt valid", () => {
          return request(app)
            .get("/api/patients/notreal-id/task-instances")
            .expect(400)
            .then(({ body }) => {
              expect(body.message).toBe("Bad Request");
            });
        });
        test("404: Returns not found when given a patient_id that is valid but the patient doesnt exist", () => {
          return request(app)
            .get("/api/patients/66e31b0dcdd5353bc16958a3/task-instances")
            .expect(404)
            .then(({ body }) => {
              expect(body.message).toBe("Patient not found");
            });
        });
      });
    });
  });

  describe("Gardian", () => {
    describe("/api/guardian/:guardian_id/patients", () => {
      describe("PATCH", () => {
        test("200: returns the updates guardian with the added patient", () => {
          const patient = { patient_id: "66e31b0dcdd5353bc16952a5" };
          return request(app)
            .patch("/api/guardian/66e31b0dcdd5353bc16957c4/patients")
            .send(patient)
            .expect(200)
            .then(({ body }) => {
              expect(body.patients).toContain("66e31b0dcdd5353bc16952a5");
            });
        });
        test("400: Returns not found when given a guardian_id that isnt valid", () => {
          const patient = { patient_id: "66e31b0dcdd5353bc16952a5" };
          return request(app)
            .patch("/api/guardian/notreal-id/patients")
            .send(patient)
            .expect(400)
            .then(({ body }) => {
              expect(body.message).toBe("Bad Request: Invalid Guardian ID");
            });
        });
        test("404: Returns not found when given a guardian_id that is valid but the guardian doesnt exist", () => {
          const patient = { patient_id: "66e31b0dcdd5353bc16952a5" };
          return request(app)
            .patch("/api/guardian/66e31b0dcdd5353bc16951a3/patients")
            .send(patient)
            .expect(404)
            .then(({ body }) => {
              expect(body.message).toBe("Guardian not found");
            });
        });
        test("404: Returns not found when given a patient that doesnt exist", () => {
          const patient = { patient_id: "66e31b0dcdd5353bc16952c5" };
          return request(app)
            .patch("/api/guardian/66e31b0dcdd5353bc16957c4/patients")
            .send(patient)
            .expect(404)
            .then(({ body }) => {
              expect(body.message).toBe("Patient not found");
            });
        });
      });
    });
    describe("/api/guardian/:user_id", () => {
      describe("GET", () => {
        test("200: returns the guardian info when given the user_id", () => {
          return request(app)
            .get("/api/guardian/11")
            .expect(200)
            .then(({ body }) => {
              expect(body).toMatchObject({
                _id: expect.any(String),
                user: expect.any(Object),
                phone: expect.any(String),
                patients: expect.any(Array),
              });
            });
        });
        test("404: returns not found when the user_id doesnt relate to a guardian", () => {
          return request(app)
            .get("/api/guardian/1")
            .expect(404)
            .then(({ body }) => {
              expect(body.message).toBe("Guardian not found");
            });
        });
      });
    });
  });

  describe("Carer", () => {
    describe("/api/carer/:carer_id/patients", () => {
      describe("PATCH", () => {
        test("200: returns the updated carer with the added patient", () => {
          const patient = { patient_id: "66e31b0dcdd5353bc16952a5" };
          return request(app)
            .patch("/api/carer/66e31b0dcdd5353bc16957c2/patients")
            .send(patient)
            .expect(200)
            .then(({ body }) => {
              expect(body.patients).toContain("66e31b0dcdd5353bc16952a5");
            });
        });
        test("400: Returns not found when given a carer_id that isnt valid", () => {
          const patient = { patient_id: "66e31b0dcdd5353bc16952a5" };
          return request(app)
            .patch("/api/carer/notreal-id/patients")
            .send(patient)
            .expect(400)
            .then(({ body }) => {
              expect(body.message).toBe("Bad Request: Invalid Carer ID");
            });
        });
        test("404: Returns not found when given a carer_id that is valid but the carer doesnt exist", () => {
          const patient = { patient_id: "66e31b0dcdd5353bc16952a5" };
          return request(app)
            .patch("/api/carer/66e31b0dcdd5353bc16951c2/patients")
            .send(patient)
            .expect(404)
            .then(({ body }) => {
              expect(body.message).toBe("Carer not found");
            });
        });
        test("404: Returns not found when given a patient that doesnt exist", () => {
          const patient = { patient_id: "66e31b0dcdd5353bc16952c5" };
          return request(app)
            .patch("/api/carer/66e31b0dcdd5353bc16957c2/patients")
            .send(patient)
            .expect(404)
            .then(({ body }) => {
              expect(body.message).toBe("Patient not found");
            });
        });
      });
    });
    describe("/api/carer/:user_id", () => {
      describe("GET", () => {
        test("200: returns the carer info when given the user_id", () => {
          return request(app)
            .get("/api/carer/10")
            .expect(200)
            .then(({ body }) => {
              expect(body).toMatchObject({
                _id: expect.any(String),
                user: expect.any(Object),
                phone: expect.any(String),
                address: expect.any(String),
                patients: expect.any(Array),
                about: expect.any(String),
              });
            });
        });
        test("404: returns not found when the user_id doesnt relate to a carer", () => {
          return request(app)
            .get("/api/carer/1")
            .expect(404)
            .then(({ body }) => {
              expect(body.message).toBe("Carer not found");
            });
        });
      });
    });
  });

  describe("Tasks", () => {
    describe("/api/tasks/templates/:tasktemplate_id", () => {
      describe("PATCH", () => {
        test("200: returns the correctly updated task template", () => {
          const update = { text: "lunch" };
          return request(app)
            .patch("/api/tasks/templates/66e31b0dcdd5353bc16957c7")
            .send(update)
            .expect(200)
            .then(({ body }) => {
              console.log(body);
              expect(body).toMatchObject({
                _id: "66e31b0dcdd5353bc16957c7",
                text: "lunch",
              });
            });
        });
      });
    });
  });
});
