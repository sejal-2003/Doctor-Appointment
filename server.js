//initialization
const express = require("express");
const colors = require("colors");
const morgan = require("morgan");
const dotenv = require("dotenv");
// const { connect } = require('mongoose');
const connectDB = require("./config/db");
const path = require("path");

//dotenv config
dotenv.config();

//mongodb connection
connectDB();

//creating rest object
const app = express();

//creating middlewares
app.use(express.json()); //adding this, no errors will show related to parsing
app.use(morgan("dev"));

//setting routes
app.use("/api/v1/user", require("./routes/userRoutes"));
app.use("/api/v1/admin", require("./routes/adminRoutes"));
app.use("/api/v1/doctor", require("./routes/doctorRoutes"));

//static files
app.use(express.static(path.join(__dirname, "./client/build")));

app.length("*", function (req, res) {
  res.sendFile(path.join(__dirname, "./client/build/index.html"));
});

//port
const port = process.env.PORT || 8080;
//Listen port
app.listen(port, () => {
  console.log(
    `Server Running in ${process.env.NODE_MODE} Mode on port ${process.env.PORT}`
      .bgCyan.white
  );
});