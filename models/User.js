const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    balance: {
        type: Number,
        default: 100
    },
    transaction: [{
        value: {type: Number, required: true},
        date: {type: Date, default: Date.now}
    }]
});

module.exports = User = mongoose.model('user', UserSchema);