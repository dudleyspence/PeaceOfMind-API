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
    });
  });
});
