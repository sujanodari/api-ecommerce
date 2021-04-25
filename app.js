const express = require("express");
const notFound = require("./middlewares/notFound");

const app = express();

const loader = require("./loaders");
const schema = require("./graphql/schema");
const logger = require("./utils/logger")("app");

process.on("unhandledRejection", (err) => {
  logger.error({
    operation: "unhandledRejection",
    message: "Unhandled rejection",
    data: err,
  });
});

loader({ app, schema });
app.use(notFound);

module.exports = app;
