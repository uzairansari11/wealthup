const express = require("express");
const { getCode, checkCode } = require("../controllers/codeController");

const codeRouter = express.Router();

codeRouter.get("/", getCode);

codeRouter.post("/", checkCode);

module.exports = { codeRouter };
