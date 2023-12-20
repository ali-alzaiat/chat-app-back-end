const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema({
    sender: {
        type: String,
        ref: 'User',
        required: true
    },
    receiver: {
        type: String,
        ref: 'User',
        required: true
    },
    content: {
        type: String,
        required: true
    },
    timestamp: {
        type: Date,
        default: Date.now
    }
  });

  
module.exports = mongoose.model('Message', messageSchema);