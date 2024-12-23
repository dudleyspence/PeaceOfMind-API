const swaggerAutogen = require("swagger-autogen")();

const doc = {
  info: {
    title: "PeaceOfMind API",
    description: "API documentation for PeaceOfMind API",
    version: "1.0.0",
  },
  host: "localhost:8000",
};

const outputFile = "./swagger-output.json"; // The generated Swagger file
const routes = [
  "../app.js",
  "../routes/carer.routes.js",
  "../routes/comment.routes.js",
  "../routes/file.routes.js",
  "../routes/patient.routes.js",
  "../routes/task.routes.js",
  "../routes/guardian.routes.js",
];

// Generate the Swagger documentation
swaggerAutogen(outputFile, routes, doc).then(() => {
  console.log("Swagger file generated successfully!");
});
