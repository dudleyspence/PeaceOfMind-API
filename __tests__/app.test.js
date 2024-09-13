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
                  relationToPatient: expect.any(String),
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
                    /^(Hygiene|Meals|Medical|Additional)$/
                  ),
                  repeatInterval: expect.stringMatching(
                    /^(daily|weekly|none)$/
                  ),
                  repeatEndDate: expect.anything(),
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
});
