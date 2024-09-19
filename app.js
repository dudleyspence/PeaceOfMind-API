const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./docs/swagger-output.json");
const express = require("express");
const app = express();
const cors = require("cors");
app.use(cors());

const routers = require("./routes/index.routes");

app.use(express.json());
const {
  handleServerError,
  handleCustomError,
  handlePSQLErrors,
} = require("./errors/errors");

app.get("/api", function (req, res) {
  res.status(200).send("Hello World");
});

for (router in routers) {
  app.use("/api", routers[router]);
}

//auto generate openAPI docs
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

//URL not found
app.all("*", (request, response) => {
  response.status(404).send({ msg: "Not Found!" });
});

//Error Handling
app.use(handlePSQLErrors);
app.use(handleCustomError);
app.use(handleServerError);

module.exports = app;
