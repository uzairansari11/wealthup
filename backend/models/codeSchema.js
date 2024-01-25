const mongoose = require("mongoose");

const codeSchema = new mongoose.Schema({
  value: { type: String, unique: true },
  createdAt: { type: Date, default: Date.now },
  used: { type: Boolean, default: false },
});

const CodeModel = mongoose.model("Code", codeSchema);

module.exports = { CodeModel };
