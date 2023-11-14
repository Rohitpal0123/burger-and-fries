const fs = require("fs");
const xlsx = require("xlsx");
const bulkUploadSchema = require("../../jsonSchema/Bulk-upload/add");
const Validator = require("jsonschema").Validator;
const v = new Validator();
const Product = require("../../models/product.model");

class uploadProduct {
  async insertMany(finalProduct) {
    try {
      const newBulkProducts = await Product.insertMany(finalProduct);

      if (!newBulkProducts) throw "Products not added !";
    } catch (error) {
      res.status(400).json(error);
    }
  }

  async validateJson(jsonData) {
    try {
      let len = jsonData.length;
      const failedValidation = [];
      const passedValidation = [];
      for (let i = 0; i < len; i++) {
        const valid = v.validate(jsonData[i], bulkUploadSchema);

        if (valid.errors.length == 0) {
          delete jsonData[i].serial;
          passedValidation.push(jsonData[i]);
        }

        valid.errors.forEach((error) => {
          failedValidation.push({ [`Serial no. ${i + 1}`]: error.stack });
        });
      }

      return { passedValidation, failedValidation };
    } catch (error) {
      console.log("🚀 ~ error:", error);
      throw error;
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
      const result = await this.validateJson(jsonData);

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
