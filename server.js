const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
// const Redis = require("redis");
const morgan = require("morgan");
const winston = require("winston");
const { combine, timestamp, json } = winston.format;
const cookieParser = require("cookie-parser");
require("dotenv").config();

//Initialize Express application
const app = express();
app.use(cors());
app.use(express.json());
app.use(cookieParser());

//Initialize Redis client for data caching
// const redisClient = Redis.createClient();
// redisClient.on("error", (error) => console.log("Redis Error:", error));
// redisClient.on("connect", () => {
//   console.log("Redis server connection established successfully");
// });

// Set up logging to console with winston and morgan for better debugging and error tracking
const logger = winston.createLogger({
  level: "http",
  format: combine(timestamp(), json()),
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({
      filename: "./log/httpRequest.log",
    }),
  ],
});

const morganMiddleware = morgan("tiny", {
  stream: {
    write: (message) => logger.http(message.trim()),
  },
});

app.use(morganMiddleware);

//Establish MongoDB connection
const uri = process.env.ATLAS_URI;
mongoose.connect(uri);
const connection = mongoose.connection;
connection.once("open", () => {
  console.log("MongoDB database connection established successfully");
});

//Consume API endpoint
const productRouter = require("./routes/product");
const categoryRouter = require("./routes/category");
const orderRouter = require("./routes/order");
const employeeRouter = require("./routes/employee");
const managerRouter = require("./routes/manager");
const roleRouter = require("./routes/role");
const bulkUploadRouter = require("./routes/bulkUpload");
const mealRouter = require("./routes/meal");
const customerRouter = require("./routes/customer");

app.use("/product", productRouter);
app.use("/category", categoryRouter);
app.use("/order", orderRouter);
app.use("/employee", employeeRouter);
app.use("/manager", managerRouter);
app.use("/role", roleRouter);
app.use("/bulkUpload", bulkUploadRouter);
app.use("/meal", mealRouter);
app.use("/customer", customerRouter);
app.use("/", (req, res) => {
  res.send("Welcome to burger & fries");
});

//Create PORT and host express server on the same
const port = process.env.PORT || 8000;

app.listen(port, () => {
  console.log(`Server is running on port:${port}`);
});
