const express = require("express");
const {
  signupValidators,
  loginValidators,
} = require("../middlewares/user.middleware");
const { validatorHandler } = require("./../middlewares/common");
const {
  postSignup,
  postLogin,
  getAuthUser,
} = require("../controllers/user.controller");
const withErrorHandling = require("../helpers/withErrorHandling");
const { isAuth } = require("../middlewares/isAuth");

const router = express.Router();

router.post(
  "/signup",
  signupValidators,
  validatorHandler,
  withErrorHandling(postSignup)
);

router.post(
  "/login",
  loginValidators,
  validatorHandler,
  withErrorHandling(postLogin)
);

router.get("/", isAuth, withErrorHandling(getAuthUser));

module.exports = router;
