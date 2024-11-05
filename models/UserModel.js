const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    phone: {
        type: Number,
        required: true,
        unique: true
    },
    verificationCode: {
        type: Number,
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    verificationExpires: {
        type: Date
    }
});

module.exports = mongoose.model('User', UserSchema);
