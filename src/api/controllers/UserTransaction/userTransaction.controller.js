const { UserTransaction } = require("../../models");
const mongoose = require("mongoose");
const createError = require("http-errors");
exports.Create = async (req, res, next) => {
  try {
    let body = {};
    body = req.body;
    if (body.amount <= 0)
      throw createError.NotAcceptable("Amount Is Not Acceptable");

    const userTransaction = new UserTransaction({
      _id: mongoose.Types.ObjectId(),
      user: body.user,
      transaction_type: body.transaction_type,
      amount: body.amount,
      transaction: body.transaction,
    });

    const data = await userTransaction.save();

    res.status(201).json({
      statusCode: 201,
      message: "success",
      data,
    });
  } catch (error) {
    next(error);
  }
};

exports.GetAll = async (req, res, next) => {
  try {
    const data = await UserTransaction.aggregate([
      {
        $lookup: {
          from: "users",
          localField: "user",
          foreignField: "_id",
          as: "user",
        },
      },
      {
        $unwind: "$user",
      },
      {
        $lookup: {
          from: "transactions",
          localField: "transaction",
          foreignField: "_id",
          as: "transaction",
        },
      },
      {
        $unwind: "$transaction",
      },
      {
        $lookup: {
          from: "users",
          localField: "transaction.payee",
          foreignField: "_id",
          as: "transaction.payee",
        },
      },
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
