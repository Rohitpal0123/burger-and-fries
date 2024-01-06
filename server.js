const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const Redis = require("redis");

require("dotenv").config();
const redisClient = Redis.createClient();
redisClient.on("error", (error) => console.log("Redis Error:", error));
redisClient.on("connect", () => {
  console.log("Redis server connection established successfully");
});

const app = express();
const port = process.env.PORT || 8000;

app.use(cors());
app.use(express.json());

const uri = process.env.ATLAS_URI;
mongoose.connect(uri);
const connection = mongoose.connection;
connection.once("open", () => {
  console.log("MongoDB database connection established successfully");
});

const productRouter = require("./routes/product");
const categoryRouter = require("./routes/category");
const orderRouter = require("./routes/order");
const employeeRouter = require("./routes/employee");
const managerRouter = require("./routes/manager");
const roleRouter = require("./routes/role");
const bulkUploadRouter = require("./routes/bulkUpload");
const mealRouter = require("./routes/meal");

app.use("/product", productRouter);
app.use("/category", categoryRouter);
app.use("/order", orderRouter);
app.use("/employee", employeeRouter);
app.use("/manager", managerRouter);
app.use("/role", roleRouter);
app.use("/bulkUpload", bulkUploadRouter);
app.use("/meal", mealRouter);
app.use("/", (req, res) => {
  res.send("Welcome to burger & fries");
});

app.listen(port, () => {
  console.log(`Server is running on port:${port}`);
});
