const express = require("express");
const cors = require("cors");

// Create express instance
const app = express();

//registering cors
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const user = require("./modules/user");

app.use(user);

// Export the server middleware
module.exports = {
  path: "/",
  handler: app,
};
