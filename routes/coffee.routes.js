const express = require("express");
const withErrorHandling = require("../helpers/withErrorHandling");
const { getAllCoffees } = require("../controllers/coffee.controller");

const router = express.Router();

router.get("/", withErrorHandling(getAllCoffees));

module.exports = router;
