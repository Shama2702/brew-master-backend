const express = require("express");
const {
  updateOrderStatus,
  getOrders,
} = require("./../controllers/admin.order.controller");
const withErrorHandling = require("../helpers/withErrorHandling");
const { isAdmin } = require("../middlewares/isAuth");

const router = express.Router();

router.put("/:orderId/status", isAdmin, withErrorHandling(updateOrderStatus));
router.get("/", isAdmin, withErrorHandling(getOrders));

module.exports = router;
