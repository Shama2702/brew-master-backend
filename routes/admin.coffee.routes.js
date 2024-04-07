const express = require("express");
const {
  postCreateCoffee,
  putUpdateCoffee,
  deleteCoffee,
} = require("./../controllers/admin.coffee.controller");
const withErrorHandling = require("../helpers/withErrorHandling");
const { isAdmin } = require("../middlewares/isAuth");

const router = express.Router();

router.post("/", isAdmin, withErrorHandling(postCreateCoffee));
router.put("/:coffeeId", isAdmin, withErrorHandling(putUpdateCoffee));
router.delete("/:coffeeId", isAdmin, withErrorHandling(deleteCoffee));

module.exports = router;
