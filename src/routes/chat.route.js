const express = require("express");
const chatController = require("../controllers/chat.controller");
const router = express.Router();

// const instruction = {
//   role: "system",
//   content:
//     "You are a psychologist.Let's keep the conversation human-like, responding in a way that feels natural and relatable.Respond in swahili",
// };

router.post("/chat", async (req, res) => {
  const newMessages = req.body.messages;

  const response = await chatController.main(newMessages);

  const chatCompletion = {role:"assistant",content:response};
  newMessages.push(chatCompletion);
  res.json({ messages: newMessages });
});

module.exports = router;
