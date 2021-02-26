var mongoose = require("mongoose");
var Schema = mongoose.Schema

var stockSchema = new Schema({
    stockID: {
        type: String
    }
})

var trans = new Schema({
    quantity: {
        type: Number
    },
    rate: {
        type: Number
    },
    time: { type: Date, default: Date.now }
})

var port = new Schema({
    stockID: {
        type: String
    },
    quantity: {
        type: Number
    },
    rate: {
        type: Number
    },
    transactions: [trans]
})

var userData = new Schema({
    username: {
        required: true,
        type: String,
    },
    password: {
        required: true,
        type: String,
    },
    email: {
        required: true,
        type: String,
    },
    cash: {
        type: Number
    },
    stock: [stockSchema],
    portfolio: [port],
})

var Sign = mongoose.model('stock_user', userData);

module.exports = Sign;