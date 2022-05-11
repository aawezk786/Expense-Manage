const mongoose = require("mongoose");
const { mongoPw, mongoIAM, mongoDb } = require("../../core/config");
require("dotenv").config();

mongoose
  .connect(mongoIAM + mongoPw + mongoDb, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => {
    console.log("DB Connected");
  })
  .catch((err) => {
    console.log(err.message);
  });
