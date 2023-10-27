const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

require("dotenv").config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, { useNewUrlParser: true });

const connection = mongoose.connection;

connection.once("open", () => {
  console.log("MongoDB database conncetion established successfully");
});

const productRouter = require("./routes/productRoutes");

app.use("/product", productRouter);

app.listen(port, () => {
  console.log(`Server is running on port:${port}`);
});
