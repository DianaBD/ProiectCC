const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const UserSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        required: true,
        enum: ['admin', 'user', 'suport']
    },
    email: {
        type: String,
        required: false
    },
    address: {
        type: String,
        required: false
    },
    phoneNumber: {
        type: String,
        required: false
    },
    firstName: {
        type: String,
        required: false
    },
    lastName: {
        type: String,
        required: false
    },
    confirmed: {
        type: String,
        required: false
    }
}, { timestamps: true });

const UserModel = mongoose.model('Users', UserSchema);
module.exports = UserModel;
