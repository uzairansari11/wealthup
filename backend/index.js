/* --------------Import Statements------------ */
const express = require("express");
require("dotenv").config();
const cors = require("cors");
const { codeRouter } = require("./routes/codeRoute");
const { dbConnection } = require("./config/db");
/* ------------------------------------------------ */
const app = express();
app.use(cors());
app.use(express.json());

/* ------  Home Route ---------  */
app.get("/", (req, res) => {
  res.send("Welcome to the home page!");
});
/* ------  Code Generate Route ---------  */

app.use("/code", codeRouter);

/* ------  Not Found Route ---------  */

app.use((req, res) => {
  res.status(404).send("Route not found");
});

/* ------  Listening to Server ---------  */

app.listen(process.env.PORT, async () => {
  try {
    await dbConnection();
  } catch (error) {
    console.log(error);
  }
  console.log(`Server is running at ${process.env.PORT}`);
});
