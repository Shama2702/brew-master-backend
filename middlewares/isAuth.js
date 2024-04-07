const jwt = require("jsonwebtoken");
const createError = require("http-errors");

const isAuth = (req, res, next) => {
  const authHeader = req.get("Authorization");
  if (!authHeader) {
    const err = createError(401, "Unauthorized user");
    next(err);
    return;
  }
  try {
    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded) {
      throw new Error("Unauthorized user");
    }
    req.userData = decoded;
    next();
  } catch (error) {
    const err = createError(401, error.message, {
      errors: error.errors || undefined,
    });
    next(err);
  }
};

const isAdmin = (req, res, next) => {
  const authHeader = req.get("Authorization");
  if (!authHeader) {
    const err = createError(401, "Unauthorized user");
    next(err);
    return;
  }
  try {
    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded) {
      throw new Error("Unauthorized user");
    }
    req.userData = decoded;
    if (!req.userData.isAdmin) {
      const err = createError(401, "Only admin can access this route");
      next(err);
      return;
    }
    next();
  } catch (error) {
    const err = createError(401, error.message, {
      errors: error.errors || undefined,
    });
    next(err);
  }
};

module.exports = {
  isAuth,
  isAdmin,
};
