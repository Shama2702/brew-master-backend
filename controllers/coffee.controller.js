const createError = require("http-errors");

//Models
const Coffee = require("./../models/coffee.model");

exports.getAllCoffees = async (req, res, next) => {
  const coffees = await Coffee.find({ is_deleted: false });
  return res.status(200).json({
    msg: "Coffees fetched successfully",
    data: coffees,
  });
};
