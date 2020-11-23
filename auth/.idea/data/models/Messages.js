const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const MessageSchema = new Schema({
    author: {
        type: Schema.Types.ObjectId,
        ref: 'Users',
        required: true
    },
    message: {
        type: String,
        required: true
    },
    resolved: {
        type: String,
        required: true
    },
    faq: {
        type: String,
        required: true
    }
}, { timestamps: true });

const MessageModel = mongoose.model('Messages', MessageSchema);

module.exports = MessageModel;
