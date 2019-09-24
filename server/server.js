/**
 * Project 3 Starter
 * UNC Charlotte Full-Stack Coding Bootcamp
 */

//-- .env --------------------------------------------------------------------
const path = require("path");
if (process.env.NODE_ENV !== "production") {
  require("dotenv").config({
    path: path.resolve(__dirname, ".env")
  });
}

//-- Dependencies ------------------------------------------------------------
const express = require("express"),
  logger = require("morgan"),
  mongoose = require("mongoose");

const { passport } = require("./lib/passport");

//-- Constants ---------------------------------------------------------------
const PORT = process.env.PORT || 3001;
const LOG_MODE = process.env.NODE_ENV === "production" ? "common" : "dev";

//-- Express -----------------------------------------------------------------
const app = express();

//-- Mongoose Setup ----------------------------------------------------------
// mongoose.connect(
//   process.env.MONGODB_URI ||
//     "mongodb://dreamteam:getgudjawbs4@ds211368.mlab.com:11368/heroku_7k8rf6zz",
//   {
//     useNewUrlParser: true
//   }
// );

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/RoadTripDB", {
  useNewUrlParser: true
});

mongoose.connection.on("error", (err) => {
  console.log(`Mongoose connection err:\n${err}`);
});

//-- Middleware --------------------------------------------------------------
app.use(logger(LOG_MODE));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(passport.initialize());

//-- Static Server (Production) ----------------------------------------------
if (process.env.NODE_ENV === "production") {
  const clientBuildPath = path.join(__dirname, "..", "client", "build");
  console.log(`Client build path: ${clientBuildPath}\n`);
  app.use(express.static(clientBuildPath));
}

//-- Controller Routes -------------------------------------------------------
app.use(require("./controllers"));

//-- React catch-all ---------------------------------------------------------
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/build/index.html"));
});

//-- Main --------------------------------------------------------------------
app.listen(PORT, () => {
  console.log(`🚀 Server listening on port ${PORT}...`);
});

//-- Export to Tests ---------------------------------------------------------
module.exports = app;
