const { type } = require("express/lib/response");
const { Schema, model } = require("mongoose");

const tokenSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  refreshToken: {
    type: String,
    required: true,
  },
  accessToken: String,
  createdAt: {
    type: Date,
    default: Date.now(),
    expires: 60*60*24*7,
  },
});
exports.Token = model("Token", tokenSchema);