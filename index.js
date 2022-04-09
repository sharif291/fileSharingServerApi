const express = require("express");
const compression = require("compression");
const bodyParser = require("body-parser");
const cors = require("cors");
const routes = require("./routes/routes.js");
const dotenv = require("dotenv");
const cron = require("node-cron");
const envConfig = require("./config/envConfig.js");
const connectDB = require("./startup/db");
const cleanup = require("./utils/cleanup");
dotenv.config();
envConfig();
const PORT = process.env.PORT;
const app = express();
app.use(compression());
app.use(bodyParser.json());
// Allow CORS origin for all
var whitelist = ["*"];
// Create CORS options and response message
var corsOptions = {
  origin: function (origin, callback) {
    if (!origin || whitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback("You are not allowed to access these resources");
    }
  },
};
//connect to MongoDB Database
connectDB();
//  internal job to cleanup uploaded files
cron.schedule("*0 0 0 * * *", function () {
  cleanup();
});
app.use("/", cors(corsOptions), routes);
// Start the server
app.listen(PORT, () => {
  console.log(`server listening on port ${PORT}`);
});

module.exports = app;
