const Coffee = require("../models/coffee.model");
const Order = require("../models/order.model");
const { getCoffeesByIds } = require("../helpers/db/coffee.helper");

exports.postCreateOrder = async (req, res) => {
  const { userId } = req.userData;
  const items = req.body.coffees;
  const coffees = await getCoffeesByIds(items.map((item) => item.coffee));
  let total = 0;
  for (let i = 0; i < items.length; i++) {
    const coffeeItem = coffees.find(
      (coffee) => coffee._id.toString() === items[i].coffee
    );
    if (!coffeeItem) {
      continue;
    }

    total += coffeeItem.price * items[i].quantity;
  }

  const newOrder = new Order({
    user: userId,
    coffees: items,
    total_price: total,
  });
  await newOrder.save();
  return res.status(201).json({ msg: "Order created" });
};

exports.getOrders = async (req, res) => {
  const { userId } = req.userData;
  const orders = await Order.find(
    { user: userId },
    {},
    {
      populate: {
        path: "coffees.coffee",
        select: "name price image",
      },
      sort: { createdAt: -1 },
    }
  );
  return res.status(200).json({
    msg: "Orders",
    data: orders,
  });
};

exports.getOrderDetails = async (req, res) => {
  const { id: orderId } = req.params;
  const order = await Order.findById(orderId).populate({
    path: "coffees.coffee",
    select: "name price image",
  });
  if (!order) {
    return res.status(404).json({ msg: "Order not found" });
  }
  return res.status(200).json({
    msg: "Order details",
    data: order,
  });
};
