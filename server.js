const app = require("./app");
const { port } = require("./config");
const logger = require("./utils/logger")("server");

app.listen(port, () => {
  const operation = "app.listen";
  logger.info({ operation, message: `Listening to port ${port}` });
});
