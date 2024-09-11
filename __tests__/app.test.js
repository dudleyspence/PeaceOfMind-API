process.env.NODE_ENV = "test";

const seedData = require("../db/seeds/seed");
const mongoose = require("mongoose");

beforeAll(() => {
  return seedData();
});

afterAll(() => {
  return mongoose.disconnect();
});

test("Sample test to ensure tests are working", () => {
  expect(true).toBe(true);
});
