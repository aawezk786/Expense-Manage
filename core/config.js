"use strict";
const dotenv = require("dotenv");
const assert = require("assert");
dotenv.config();

const { PORT, MONGO_DB_PW, MONGO_IAM, MONGO_DB } = process.env;

// console.log(AUTH_SERVICE_PORT);
assert(PORT, " Port is required");
assert(MONGO_DB_PW, "MongoDB Password is required");
assert(MONGO_IAM, "Mongodb User is required");
assert(MONGO_DB, "MondoDB String is required");

module.exports = {
  Port: PORT,
  mongoPw: MONGO_DB_PW,
  mongoIAM: MONGO_IAM,
  mongoDb: MONGO_DB,
};
