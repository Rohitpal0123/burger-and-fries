const fs = require("fs").promises;

class readFile {
  process = async (req, res, next) => {
    try {
      //how to generalize path between read and delete ?
      //const path = "./file-system/textfile1.txt"
      const data = await fs.readFile("./file-system/textfile1.txt");
      console.log("🚀 ~ data:", data);
      const text = data.toString();
      console.log("🚀 ~ text:", text);
      next();
    } catch (error) {
      console.log("🚀 ~ error:", error);
      res.status(400).json(error);
    }
  };
}

module.exports = new readFile();
