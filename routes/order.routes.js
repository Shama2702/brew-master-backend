const express = require("express");
const withErrorHandling = require("../helpers/withErrorHandling");
const {
  postCreateOrder,
  getOrders,
  getOrderDetails,
} = require("../controllers/order.controller");
const { isAuth } = require("../middlewares/isAuth");

const router = express.Router();

router.post("/", isAuth, withErrorHandling(postCreateOrder));
router.get("/", isAuth, withErrorHandling(getOrders));
router.get("/:id", withErrorHandling(getOrderDetails));

module.exports = router;
