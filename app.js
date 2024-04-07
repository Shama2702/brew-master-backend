require("dotenv").config();
const path = require("path");
const express = require("express");
const morgan = require("morgan");

//ROUTERS
const userRoute = require("./routes/user.routes");
const coffeeRoute = require("./routes/coffee.routes");
const orderRoute = require("./routes/order.routes");

// ADMIN ROUTES
const adminCoffeeRoute = require("./routes/admin.coffee.routes");
const adminOrderRoute = require("./routes/admin.order.routes");

//Middlewares
const { notFoundUrl, errorHandler } = require("./middlewares/common");

const app = express();

app.use(morgan("dev"));
app.use(express.json()); // parse application/json
app.use("/media", express.static(path.join(__dirname, "media")));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "OPTIONS, GET, POST, PUT, PATCH, DELETE"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

//routes
app.use("/user", userRoute);
app.use("/coffee", coffeeRoute);
app.use("/order", orderRoute);
app.use("/admin/coffee", adminCoffeeRoute);
app.use("/admin/order", adminOrderRoute);

app.use(notFoundUrl);
app.use(errorHandler);

module.exports = app;
