const { Transaction, UserTransaction } = require("../../models");
const mongoose = require("mongoose");
const createError = require("http-errors");
const async = require("async");
exports.Create = async (req, res, next) => {
  try {
    let body = {};
    body = req.body;
    let payee = body.payee;
    let expense_type = body.expense_type;
    if (body.amount <= 0)
      throw createError.NotAcceptable("Amount Is Not Acceptable");
    if (expense_type == "PERCENT") {
      if (body.amount != 100)
        throw createError.NotAcceptable(
          "Amount Is Not Acceptable Please Make It 100(Because You Choose Percent)"
        );
    }

    //Create Transaction
    const transaction = new Transaction({
      _id: mongoose.Types.ObjectId(),
      payer: body.payer,
      expense_type: body.expense_type,
      amount: body.amount,
      payee: body.payee,
    });
    let transactions = await transaction.save();

    //Create UserTransaction
    const userTransaction = new UserTransaction({
      _id: mongoose.Types.ObjectId(),
      user: transactions.payer,
      transaction_type: "DEBIT",
      amount: transactions.amount,
      transaction: transactions.id,
    });
    let userTran = await userTransaction.save();

    //Create Multiple UserTransaction for Payee
    for (let i = 0; i < payee.length; i++) {
      const user = payee[i];
      CalculatedAmount = getShare(payee, userTran.amount, expense_type);
      console.log(CalculatedAmount);
      const userTransaction = new UserTransaction({
        _id: mongoose.Types.ObjectId(),
        user: user,
        transaction_type: "CREDIT",
        amount: CalculatedAmount,
        transaction: userTran.transaction,
      });
      await userTransaction.save();
    }

    res.status(200).json({
      statusCode: 200,
      message: "success",
      data: userTran,
    });
  } catch (error) {
    next(error);
  }
};

function getShare(payee, amount, expense_type) {
  if (expense_type === "EXACT") {
    return amount;
  }

  if (expense_type === "EQUAL") {
    return (amount / payee.length).toFixed(2);
  }

  if (expense_type === "PERCENT") {
    return amount / payee.length;
  }
}

exports.GetAll = async (req, res, next) => {
  try {
    const data = await Transaction.aggregate([
      {
        $lookup: {
          from: "users",
          localField: "payer",
          foreignField: "_id",
          as: "payer",
        },
      },
      {
        $unwind: "$payer",
      },
      {
        $unwind: "$payee",
      },
      {
        $lookup: {
          from: "users",
          localField: "payee",
          foreignField: "_id",
          as: "payee",
        },
      },
      {
        $group: {
          _id: "$_id",
          payee: {
            $push: {
              $arrayElemAt: ["$payee", 0],
            },
          },
          payer: {
            $first: "$payer",
          },
          expense_type: {
            $first: "$expense_type",
          },
          amount: {
            $first: "$amount",
          },
          createdAt: {
            $last: "$createdAt",
          },
          updatedAt: {
            $last: "$updatedAt",
          },
        },
      },
      // { $replaceRoot: { newRoot: "$payee" } },
    ]);
    res.status(200).json({
      statusCode: 200,
      message: "success",
      data,
    });
  } catch (error) {
    next(error);
  }
};
