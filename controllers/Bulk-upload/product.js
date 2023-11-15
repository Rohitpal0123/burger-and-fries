const fs = require("fs");
const xlsx = require("xlsx");
const bulkUploadSchema = require("../../jsonSchema/Bulk-upload/add");
const Validator = require("jsonschema").Validator;
const v = new Validator();
const Product = require("../../models/product.model");
const validateBulkUploadSchema = require("../../lib/validateBulkUpload");
const { json } = require("express");

class uploadProduct {
  async insertMany(finalProduct) {
    try {
      const newBulkProducts = await Product.insertMany(finalProduct);

      if (!newBulkProducts) throw "Products not added !";
    } catch (error) {
      res.status(400).json(error);
    }
  }

  async convertExcelToJson(fileContent) {
    try {
      const dataBuffer = Buffer.isBuffer(fileContent)
        ? fileContent
        : Buffer.from(fileContent);

      const workbook = xlsx.read(dataBuffer, { type: "buffer" });
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];

      // Use { header: 1 } option to treat the first row as headers
      const jsonData = xlsx.utils.sheet_to_json(sheet);

      return jsonData;
    } catch (error) {
      throw error;
    }
  }

  process = async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({ error: "No file uploaded" });
      }

      const filePath = req.file.path;
      const fileContent = fs.readFileSync(filePath);

      const jsonData = await this.convertExcelToJson(fileContent);
      const result = await validateBulkUploadSchema(jsonData, bulkUploadSchema);

      const finalProduct = result.passedValidation;
      await this.insertMany(finalProduct);

      res.json(result.failedValidation);
    } catch (error) {
      console.error("Error in uploadProduct:: ", error);
      res.status(500).json(error);
    }
  };
}
module.exports = new uploadProduct();
