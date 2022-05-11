const assert = require("assert");
const Transaction = require("./Transaction/transaction.model");
const User = require("./User/user.model");
const UserTransaction = require("./UserTransaction/userTransaction.model");

assert(Transaction, "Transaction Model is Required");
assert(User, " User is required");
assert(UserTransaction, "UserTransaction is required");

module.exports = {
  Transaction: Transaction,
  User: User,
  UserTransaction: UserTransaction,
};
