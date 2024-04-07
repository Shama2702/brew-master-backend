const mongoose = require("mongoose");
const app = require("./app");

const port = process.env.PORT || 8000;

const server = app.listen(port, () => {
  console.log(`Server running at: ${port}`);

  if (process.env.NODE_ENV === "development") {
    console.log("Server run in development mode");
  }
  if (process.env.NODE_ENV === "production") {
    console.log("Server run in production mode");
  }
});

mongoose.set("strictQuery", true);
mongoose
  .connect(`${process.env.MONGO_SCRIPT}`, {})
  .then(() => {
    console.log("mongodb connected");
  })
  .catch((err) =>
    console.log(`mongodb connection failed, error: ${err.message}`, err)
  );
