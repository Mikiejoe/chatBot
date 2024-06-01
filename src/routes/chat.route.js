const express = require("express");
const chatController = require("../controllers/chat.controller");
const { Message } = require("../models/message.model");
const { Chat } = require("../models/chat.model");

const router = express.Router();

router.get("", (req, res) => {
  res.send("Welcome to the chat route");
});

router.get("/chats", chatController.getAllChats);
router.post("/chats", chatController.createChat);
router.get("/chats/:id",chatController.getMessages);
router.post("/chats/:id",chatController.createMessage );

module.exports = router;
