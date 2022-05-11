const express = require("express");
const { Create, GetAll } = require("../../controllers/User/user.controller");
const router = express.Router();
router.post("/", Create);
router.get("/", GetAll);
module.exports = router;
