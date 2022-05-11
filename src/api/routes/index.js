const express = require("express");
const router = express.Router();

const userRoute = require("./User/user.route");
const transactionRoute = require("./Transaction/transaction.route");
const usertransactionRoute = require("./UserTransaction/userTransaction.route");
router.use("/user", userRoute);
router.use("/transaction", transactionRoute);
router.use("/transaction/user", usertransactionRoute);
module.exports = router;
