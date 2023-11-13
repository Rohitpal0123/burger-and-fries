const fs = require("fs").promises;

class writeFile {
  process = async (req, res) => {
    try {
      const { text } = req.body;
      const convertedText = JSON.stringify(text);
      const slicedText = convertedText.slice(1, -1);
      console.log("🚀 ~ slicedText:", slicedText);

      const result = await fs.writeFile(
        "./file-system/textfile1.txt",
        slicedText
      );
      console.log("🚀 ~ result:", result);

      res.status(200).json("Text file created successfully !");
    } catch (error) {
      console.log("🚀 ~ error:", error);
      res.status(400).json(error);
    }
  };
}

module.exports = new writeFile();
