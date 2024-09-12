const express = require("express");
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./docs/swagger-output.json");

const routers = require("./routes/index.routes");

const app = express();

app.use(express.json());

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

module.exports = app;
