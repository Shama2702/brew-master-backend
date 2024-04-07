const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const createError = require("http-errors");

//Models
const User = require("./../models/user");

//constants
const constants = require("./../constants/values");

const bcryptSaltRound = 10;

exports.postSignup = async (req, res, next) => {
  const { password, email } = req.body;

  const checkUser = await User.findOne({ email: email });

  if (checkUser) {
    const err = createError(400, "User already exists");
    return next(err);
  }

  const hashPass = await bcrypt.hash(password, bcryptSaltRound);

  const data = {
    ...req.body,
    password: hashPass,
    is_admin: false,
  };
  const newUser = new User(data);
  const user = await newUser.save();

  const token = await jwt.sign(
    {
      userId: user._id.toString(),
      isAdmin: user.is_admin,
    },
    process.env.JWT_SECRET, //jwt secret
    { expiresIn: constants.passwordExpireDuration }
  );

  const resData = {
    msg: `Registration successful`,
    data: {
      ...user.toObject(),
      password: undefined,
    },
    token: token,
  };
  return res.status(201).json(resData);
};

exports.postLogin = async (req, res, next) => {
  const { password, email } = req.body;
  const user = await User.findOne({ email: email });
  if (!user) {
    const err = createError(401, "Invalid email or password");
    return next(err);
  }
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    const err = createError(401, "Invalid email or password");
    return next(err);
  }

  const token = await jwt.sign(
    {
      userId: user._id.toString(),
      isAdmin: user.is_admin,
    },
    process.env.JWT_SECRET, //jwt secret
    { expiresIn: constants.passwordExpireDuration }
  );

  const resData = {
    msg: `Login successful`,
    data: {
      ...user.toObject(),
      password: undefined,
    },
    token: token,
  };

  return res.status(200).json(resData);
};

exports.getAuthUser = async (req, res, next) => {
  const { userId } = req.userData;
  const user = await User.findById(userId);
  if (!user) {
    const err = createError(404, "User not found");
    return next(err);
  }

  const resData = {
    msg: `Auth success`,
    data: {
      ...user.toObject(),
      password: undefined,
    },
  };

  return res.status(200).json(resData);
};
