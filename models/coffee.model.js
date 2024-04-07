const mongoose = require("mongoose");

const coffeeSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    image: {
      type: String,
      default: null,
    },
    price: {
      type: Number,
      default: false,
    },
    is_deleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const coffeeModel = mongoose.model("Coffee", coffeeSchema);
module.exports = coffeeModel;
