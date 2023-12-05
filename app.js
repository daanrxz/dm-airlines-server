// ℹ️ Gets access to environment variables/settings
// https://www.npmjs.com/package/dotenv
require("dotenv").config();

// ℹ️ Connects to the database
require("./db");

// Handles http requests (express is node js aframework)
// https://www.npmjs.com/package/express
const express = require("express");

const app = express();

// ℹ️ This function is getting exported from the config folder. It runs most pieces of middleware
require("./config")(app);

// 👇 Start handling routes here
const indexRoutes = require("./routes/index.routes");
app.use("/", indexRoutes);

const authRoutes = require("./routes/auth.routes");
app.use("/auth", authRoutes);

const userRoutes = require('./routes/user.routes'); // Adjust the path as necessary
// ...
app.use('/user', userRoutes);

// Crew routes
const crewRoutes = require("./routes/crew.routes"); // Adjust the path as necessary
app.use("/api", crewRoutes); // Prefixing the crew routes with '/api'

//Flight routes
const flightRoutes = require('./routes/flight.routes'); // Ensure the path is correct
app.use('/api', flightRoutes);

// ❗ To handle errors. Routes that don't exist or errors that you handle in specific routes
require("./error-handling")(app);

module.exports = app;
