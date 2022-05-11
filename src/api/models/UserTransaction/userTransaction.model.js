const mongoose = require("mongoose");
const exportConfig = require("../../../../core/exportConfig");
var validateEmail = function (email) {
  var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return re.test(email);
};
const Schema = mongoose.Schema(
  {
    _id: mongoose.Schema.Types.ObjectId,
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    transaction_type: {
      type: String,
      enum: ["CREDIT", "DEBIT"],
    },
    transaction: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Transaction",
    },
    amount: {
      type: Number,
    },
  },
  { ...exportConfig, timestamps: true }
);
module.exports = mongoose.model("UserTransaction", Schema);
