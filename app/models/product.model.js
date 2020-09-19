const mongoose = require('mongoose');

const Product = mongoose.Schema({
    ProductID: String,
    Name: String,
    Description: String,
    NumberOfUnit: Number,
    Price: Number,
    CreatedDate: { type: Date, default: Date.now },
    UpdatedDate: Date,
    Active: Boolean
}, {
    timestamps: true
});

module.exports = mongoose.model('Product', Product);