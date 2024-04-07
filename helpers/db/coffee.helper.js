const Coffee = require("../../models/coffee.model");

exports.getCoffeesByIds = (coffeeIds) => {
  return Coffee.find({ _id: { $in: coffeeIds } });
};
