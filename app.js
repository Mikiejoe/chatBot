const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
require('dotenv').config();

const express = require("express");
const chatRouter = require("./src/routes/chat.route");
const authRouter = require("./src/routes/auth.routes");
const app = express();
const DEBUG = process.env.DEBUG

app.use(bodyParser.json());
app.use(cors());
app.options("*", cors());

app.use("/", chatRouter);
app.use("/auth", authRouter);

const PORT = process.env.PORT || 5000;
const MONGO_URI = DEBUG ? process.env.DEV_MONGO_URI : process.env.MONGO_URI //|| "mongodb://localhost:27017/chatapp";
mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log("connected to database");
  })
  .catch((err) => {
    console.log("error connecting to database", err);
  });

app.listen(PORT, () => {
  console.log("server running on port " + PORT);
});
