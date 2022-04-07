const routes = require("express").Router();

// Importing all route file
const files = require("./files.js");
routes.use("/files", files);

// Exporting routes
module.exports = routes;
