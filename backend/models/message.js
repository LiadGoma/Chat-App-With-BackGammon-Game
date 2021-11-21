
const mongoose = require('mongoose');
const messageSchema = new mongoose.Schema({
    members: {
        type: Array,
    },
    senderId: {
        type: String,
    },
    text: {
        type: String
    },
    createdAt: {
        type: Date
    }
});
const Message = mongoose.model('Message', messageSchema);

exports.Message = Message;

