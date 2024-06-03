const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define the Message schema
const messageSchema = new Schema({
  role: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  }
});

// Define the Chat schema
const chatSchema = new Schema({
 user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
 },
  messages: [messageSchema],
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Middleware to update the updatedAt field before saving
chatSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

// Create the Chat model
exports.Chat = mongoose.model('Chat', chatSchema);

// module. = Chat;