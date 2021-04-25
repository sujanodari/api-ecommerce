const bodyParser = require("body-parser");
const cors = require("cors");

const routes = require("../routes");
const corsConfig = require("../config/cors");

module.exports = ({ app }) => {
  const corsOptions = corsConfig.getCorsOptions();
  app.use(cors(corsOptions));
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());
  app.use(bodyParser.text({ type: "text/plain" }));

  app.use(routes);

  //error handling middleware first parm err
  app.use((err, req, res, next) => {
    if (typeof err.code === "number") {
      res.status(err.code).json({
        message: err.message,
        error: err,
      });
    } else {
      res.status(500).json({
        message: err.message,
        error: err,
      });
    }
  });
};
