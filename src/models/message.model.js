const { model, Schema } = require("mongoose");

const messageSchema = Schema({
  chatId: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "Chat",
  },
  content: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    required: true,
  },
});
exports.Message = model("Message", messageSchema);
