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

const productRouter = require("./routes/productRoutes");
const categoryRouter = require("./routes/categoryRoutes");
const user = require("./routes/user");
const role = require("./routes/role");

app.use("/product", productRouter);
app.use("/category", categoryRouter);
app.use("/user", user);
app.use("/role", role);

app.listen(port, () => {
  console.log(`Server is running on port:${port}`);
});
