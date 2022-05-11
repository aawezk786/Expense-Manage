const { User } = require("../../models");
const mongoose = require("mongoose");
const createError = require("http-errors");
exports.Create = async (req, res, next) => {
  try {
    const body = req.body || {};
    if (Object.keys(body).length == 0)
      throw createError.NotFound("Body Is Empty");

    const user = new User({
      _id: mongoose.Types.ObjectId(),
      name: req.body.name,
      email: req.body.email,
      phone: req.body.phone,
    });

    const data = await user.save();

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
    let query = req.body;
    const search = req.query.search || "";
    if (search) {
      query["$or"] = [{ email: { $regex: search, $options: "i" } }];
    }

    const data = await User.aggregate([
      {
        $match: query,
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
