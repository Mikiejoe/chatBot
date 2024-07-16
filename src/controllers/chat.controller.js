const chatUtil = require("../utils/chat.utils");
// const { Message } = require("../models/message.model");
const { Chat } = require("../models/chat.model");
const { User } = require("../models/user.model");
const mongoose = require("mongoose");
const getAllChats = async (req, res) => {
  // const chats = await Chat.find({});
  const userId = req.user.userId;
  const chats = await Chat.find({ user: userId });
  console.log(chats);
  res.json({ chats: chats});
};

const getModelMessage = async (messages, chatId) => {
  const newMessages = messages;
  console.log("messsent",newMessages)

  const response = await chatUtil.main(newMessages);

  const chatCompletion = { role: "assistant", content: response };
  // newMessages.push(chatCompletion);
  console.log(chatCompletion);
  const chat = await Chat.findById(chatId);
  chat.messages.push(chatCompletion);

  const savedMessage = await chat.save();

  return chatCompletion
};

const getMessages = async (req, res) => {
  const chatId = req.params.id;
  const chat = await Chat.findById(chatId);
  const messages = chat.messages;
  // const messages = await Message.find({ chatId });
  // console.log("hello", messages);
  // await getModelMessage(messages,chatId)
  return res.json(messages);
};

const createMessage = async (req, res) => {
  const chatId = req.params.id;
  const chat = await Chat.findById(chatId);
  const userId = req.user.userId;

  const userMessage = {
    content: req.body.content,
    role: req.body.role,
  };
  chat.messages.push(userMessage);
  const savedMessage = await chat.save();
  const messages = await Chat.aggregate([
    { $match: { _id: new mongoose.Types.ObjectId(chatId) } },
    { $project: {
        messages: {
          $map: {
            input: '$messages',
            as: 'message',
            in: {
              role: '$$message.role',
              content: '$$message.content'
            }
          }
        },
        _id: 0
      }
    }]);
  if (savedMessage) {
    console.log("mess",messages[0]);
    const modelResponse = await getModelMessage(messages[0]["messages"], chatId);
    return res.json({ message: modelResponse });
  }
};

const createChat = async (req, res) => {
  const chat = new Chat();
  const user = await User.findById(req.user.userId);
  chat.user = user._id;
  const system = {
    role: "system",
    content:
      "You are Dr. Rachel, my psychologist.Let's keep the conversation human-like, responding in a way that feels natural and relatable. Send emojis where necessary.",
  };
  try {
    chat.messages.push(system);
    const newChat = await chat.save();

    return res.json({ chat: newChat });
  } catch (error) {
    console.log(error.message);
  }

};

module.exports = {
  getAllChats,
  getModelMessage,
  createChat,
  getMessages,
  createMessage,
};
