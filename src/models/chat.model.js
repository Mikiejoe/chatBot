const {Schema,model} = require("mongoose")

const chatSchema = Schema({
    userId: {
        type:Schema.Types.ObjectId,
        required: true,
        ref: "User",
    },
    createdAt: {
        type: Date,
        default: Date.now(),
    }
});
exports.Chat = model("Chat",chatSchema)
