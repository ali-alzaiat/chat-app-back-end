const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema({
    sender: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    receiver: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    content: {
        type: [String],
        default: []
    },
    timestamp: {
        type: Date,
        default: Date.now
    }
  });

messageSchema.methods.addMessage = function(message) {
    this.content.push(message);
    return this.save();
};
  
module.exports = mongoose.model('Message', messageSchema);