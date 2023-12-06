const mongoose = require("mongoose");
const {Schema} = mongoose;

const CartSchema = new Schema({
    ownerId: {type: mongoose.Schema.Types.ObjectId, ref: "User"},
    productId: {type: mongoose.Schema.Types.ObjectId, ref: "Product"},
    orderId: {type: mongoose.Schema.Types.ObjectId, ref: "Order"},
    title: String,
    store: String,
    photo: String,
    gender: String,
    price: Number,
    color: String,
    size: String,
    amount: Number,
    checkout: {type: Boolean, default: false},
    review: {type: Boolean, default: false},
});

const CartModel = mongoose.model("Cart", CartSchema);
module.exports = CartModel;