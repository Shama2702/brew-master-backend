const createError = require("http-errors");

//Models
const Coffee = require("./../models/coffee.model");

exports.postCreateCoffee = async (req, res, next) => {
  const { name, price, description, image } = req.body;
  const newCoffee = new Coffee({ name, price, description, image });
  const coffee = await newCoffee.save();
  return res.status(201).json({
    msg: "Coffee created successfully",
    data: coffee.toObject(),
  });
};

exports.putUpdateCoffee = async (req, res, next) => {
  const { name, price, description, image } = req.body;
  const coffeeId = req.params.coffeeId;
  const coffee = await Coffee.findByIdAndUpdate(
    coffeeId,
    { name, price, description, image },
    { new: true }
  );
  if (!coffee) {
    return next(createError(404, "Coffee not found"));
  }
  return res.status(200).json({
    msg: "Coffee updated successfully",
    data: coffee.toObject(),
  });
};

exports.deleteCoffee = async (req, res, next) => {
  const coffeeId = req.params.coffeeId;
  const coffee = await Coffee.findByIdAndUpdate(coffeeId, { is_deleted: true });
  if (!coffee) {
    return next(createError(404, "Coffee not found"));
  }
  return res.status(200).json({
    msg: "Coffee deleted successfully",
  });
};
