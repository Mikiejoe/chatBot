const chatUtil = require("../utils/chat.utils");
const { Message } = require("../models/message.model");
const { Chat } = require("../models/chat.model");
const { User } = require("../models/user.model");

const getAllChats = async (req, res) => {
  const chats = await Chat.find({});
  res.json({ chats: chats });
};

const getModelMessage = async (messages, chatId) => {
  // const newMessages = messages;

  // const response = await chatUtil.main(newMessages);

  const chatCompletion = { role: "assistant", content: "helllo" };
  // newMessages.push(chatCompletion);
  // console.log(chatCompetion)
  const chat = await Chat.findById(chatId);
  const message = new Message();
  message.chatId = chat._id;
  message.content = chatCompletion.content;
  message.role = chatCompletion.role;

  const savedMessage = await message.save();

  // return chatCompletion
};

const getMessages = async (req, res) => {
  const chatId = req.params.id;
  const messages = await Message.find({ chatId });
  console.log("hello", messages);
  // await getModelMessage(messages,chatId)
  return res.json(messages);
};

const createMessage = async (req, res) => {
  const chatId = req.params.id;
  const chat = await Chat.findById(chatId);
  const message = new Message();
  const messages = await Message.find({ chatId });
  console.log("hello", messages);

  message.chatId = chat._id;
  message.content = req.body.content;
  message.role = req.body.role;
  const savedMessage = await message.save();
  if (savedMessage) {
    console.log(savedMessage);
    await getModelMessage(messages, chatId);
    return res.json({ message: savedMessage });
  }
};

const createChat = async (req, res) => {
  const chat = new Chat();
  const user = await User.findById(req.user.userId);
  chat.userId = user._id;
  const system = {
    role: "system",
    content:
      "You are Dr. Rachel, my psychologist.Let's keep the conversation human-like, responding in a way that feels natural and relatable. Send emojis where necessary.",
  };
  try {
    const newChat = await chat.save();

    if (newChat) {
      console.log(newChat);
      const systemChat = await Chat.findById(newChat._id);
      const message = new Message();
      message.chatId = systemChat._id;
      message.content = system.content;
      message.role = system.role;
      message.save()
      console.log("success");

      return res.json({ chat: newChat });
    }
  } catch (error) {
    console.log(error.message);
  }

  // await chat.save();
  // res.json({ chat });
};

module.exports = {
  getAllChats,
  getModelMessage,
  createChat,
  getMessages,
  createMessage,
};
