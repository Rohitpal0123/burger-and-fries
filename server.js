const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

require("dotenv").config();

const app = express();
const port = process.env.PORT || 8000;

app.use(cors());
app.use(express.json());

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, { useNewUrlParser: true });

const connection = mongoose.connection;

connection.once("open", () => {
  console.log("MongoDB database connection established successfully");
});

const productRouter = require("./routes/product");
const categoryRouter = require("./routes/category");
const userRouter = require("./routes/user");
const roleRouter = require("./routes/role");

app.use("/product", productRouter);
app.use("/category", categoryRouter);
app.use("/user", userRouter);
app.use("/role", roleRouter);

app.listen(port, () => {
  console.log(`Server is running on port:${port}`);
});
