const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    coffees: [
      {
        coffee: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Coffee",
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
        },
      },
    ],
    total_price: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      enum: [
        "pending",
        "processing",
        "ready",
        "on-the-way",
        "delivered",
        "cancelled",
      ],
      default: "pending",
    },
    note: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const orderModel = mongoose.model("Order", orderSchema);
module.exports = orderModel;
