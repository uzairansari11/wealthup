const { CodeModel } = require("../models/codeSchema");
const { generateCode, isCodeExpired } = require("../utils/utils");

const getCode = async (req, res) => {
  try {
    const newCode = await CodeModel.create({ value: generateCode() });
    res.json({ code: newCode.value });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Use a code
const checkCode = async (req, res) => {
  const { code } = req.body;

  try {
    const existingCode = await CodeModel.findOne({ value: code });

    if (!existingCode) {
      res.status(400).json({ error: "Enter a valid code" });
    } else if (isCodeExpired(existingCode)) {
      res.status(400).json({ error: "The code has expired" });
    } else if (existingCode.used) {
      res.status(400).json({ error: "This code has already been used" });
    } else {
      existingCode.used = true;
      await existingCode.save();
      res.json({ message: "Code is correct" });
    }
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = { getCode, checkCode };
