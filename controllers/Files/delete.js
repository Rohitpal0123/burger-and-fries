const fs = require("fs").promises;

class deleteFile {
  process = async (req, res) => {
    try {
      await fs.unlink("./file-system/textfile1.txt");

      res.status(200).json("Deleted textfile1.txt");
    } catch (error) {
      console.log("🚀 ~ error:", error);
      res.status(400).json(error);
    }
  };
}

module.exports = new deleteFile();
