const createError = require("http-errors");

//Models
const Order = require("./../models/order.model");

exports.updateOrderStatus = async (req, res, next) => {
  const { status } = req.body;
  const orderId = req.params.orderId;
  const order = await Order.findByIdAndUpdate(
    orderId,
    { status },
    {
      new: true,
      populate: [
        {
          path: "coffees.coffee",
          select: "name price image",
        },
        {
          path: "user",
          select: "first_name last_name email",
        },
      ],
    }
  );
  if (!order) {
    return next(createError(404, "Order not found"));
  }
  return res.status(200).json({
    msg: "Order updated successfully",
    data: order.toObject(),
  });
};

exports.getOrders = async (req, res, next) => {
  const orders = await Order.find()
    .populate([
      {
        path: "coffees.coffee",
        select: "name price image",
      },
      {
        path: "user",
        select: "first_name last_name email",
      },
    ])
    .sort({ createdAt: -1 });

  return res.status(200).json({
    msg: "Orders fetched successfully",
    data: orders,
  });
};
