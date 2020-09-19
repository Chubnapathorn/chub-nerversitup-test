const mongoose = require('mongoose');

const User = mongoose.Schema({
    UserID: String,
    Username: String,
    Password: String,
    Name: String
}, {
    timestamps: true
});

module.exports = mongoose.model('User', User);