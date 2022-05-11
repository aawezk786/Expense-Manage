const compression = require("compression");
const express = require("express");
const app = express();
const morgan = require("morgan");

//DB
require("./src/database");

//Nodemon
// require("./core/init_nodemon");

// Compress all HTTP responses
// app.use(compression());

//Routes
const v1 = require("./src/api/routes/index");

//PARSER SETTING
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: true, limit: "100mb" }));
app.use(express.json({ limit: "50mb" }));

//CORS SETTING
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin,X-Requested-With,Content-Type,Accept,Authorization"
  );
  if (req.method == "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "PUT,POST,PATCH,DELETE,GET");
    return res.status(200).json({});
  }
  next();
});

//Main Routes
app.use("/", v1);
//MIDDLEWARE
app.use((req, res, next) => {
  const error = new Error("Bad Request");
  error.status = 404;
  next(error);
});
app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message,
    },
  });
});

module.exports = app;
