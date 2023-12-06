const mongoose = require("mongoose");
const {Schema} = mongoose;

const OrderSchema = new Schema({
    ownerId: {type:mongoose.Schema.Types.ObjectId, ref:"User"},
    firstname: String,
    lastname: String,
    phone: String,
    address1: String,
    address2: String,
    province: String,
    postcode: String,
    country: String,
    shipmethod: String,
    paymethod: String,
    amount: Number,
    total: Number,
    date: String,
});

const OrderModel = mongoose.model("Order", OrderSchema);
module.exports = OrderModel;