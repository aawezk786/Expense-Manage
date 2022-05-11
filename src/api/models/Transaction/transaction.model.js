const mongoose = require("mongoose");
const exportConfig = require("../../../../core/exportConfig");
var validateEmail = function (email) {
  var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return re.test(email);
};
const Schema = mongoose.Schema(
  {
    _id: mongoose.Schema.Types.ObjectId,
    payer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    expense_type: {
      type: String,
      enum: ["EQUAL", "EXACT", "PERCENT"],
    },
    amount: {
      type: Number,
    },
    payee: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
  },
  { ...exportConfig, timestamps: true }
);
module.exports = mongoose.model("Transaction", Schema);
