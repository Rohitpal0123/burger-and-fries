const Product = require("../../models/product.model");
const xlsx = require("xlsx");
const path = require("path");

class getReport {
  process = async (req, res) => {
    try {
      const product = await Product.find();
      console.log("🚀 ~ product:", product);
      if (!product) throw "Products not found !";

      const productData = product.map(
        ({ name, category, foodType, price, description }) => ({
          name,
          category,
          foodType,
          price,
          description
        })
      );
      console.log("🚀 ~ productData:", productData);

      const ws = xlsx.utils.json_to_sheet(productData);
      const wb = xlsx.utils.book_new();
      xlsx.utils.book_append_sheet(wb, ws, "Sheet1");
      const buffer = xlsx.write(wb, { bookType: "xlsx", type: "buffer" });
      res.setHeader(
        "Content-Type",
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
      );
      res.setHeader(
        "Content-Disposition",
        "attachment; filename=productSheet.xlsx"
      );

      res.status(200).send(buffer);
    } catch (error) {
      console.log("🚀 ~ error:", error);
      res.status(400).json(error);
    }
  };
}

module.exports = new getReport();
