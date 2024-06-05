const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const morgan = require("morgan");
const authMiddleware = require("./src/middlewares/authMiddleware");
require("dotenv").config();

const express = require("express");
const chatRouter = require("./src/routes/chat.route");
const authRouter = require("./src/routes/auth.routes");
const app = express();
const DEBUG = process.env.DEBUG;

const dev = "https://itakuafty.vercel.app"
const prod = "http://localhost:5173"

const corsOptions = {
  origin: DEBUG ? dev:prod,
  optionsSuccessStatus: 200,
  credentials: true,
};

app.use(morgan("dev"));

app.use(bodyParser.json());
app.use(cors(corsOptions));

app.options("*", cors(corsOptions));

app.get("/",(req,res)=>{
  res.json({"succes":"server running"})
})

app.use("/auth", authRouter);
app.use("/",authMiddleware, chatRouter);

const PORT = process.env.PORT || 5000;
const MONGO_URI = DEBUG ? process.env.MONGO_DEV_URI : process.env.MONGO_URI; //|| "mongodb://localhost:27017/chatapp";
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
