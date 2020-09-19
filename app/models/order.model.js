const mongoose = require('mongoose');
const { stringify } = require('uuid');

const Order = mongoose.Schema({
    OrderID: String,
    UserID: String,
    Amount: Number,
    CreatedDate: { type: Date, default: Date.now },
    UpdatedDate: Date,
    Status: String,
    Item: Array
}, {
    timestamps: true
});

module.exports = mongoose.model('Order', Order);