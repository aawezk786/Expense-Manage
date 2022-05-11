const express = require("express");
const {
  Create,
  GetAll,
} = require("../../controllers/UserTransaction/userTransaction.controller");
const router = express.Router();
router.post("/", Create);
router.get("/", GetAll);
module.exports = router;
