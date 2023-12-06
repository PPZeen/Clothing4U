const moment = require("moment");

const mongoose = require("mongoose");
const {Schema} = mongoose;

const ReviewSchema = new Schema({
    ownerId: {type: mongoose.Schema.Types.ObjectId, ref: "User"},
    cartId: {type:mongoose.Schema.Types.ObjectId, ref:"Cart"},
    productId: {type: mongoose.Schema.Types.ObjectId, ref: "Product"},
    owner: String,
    rate: Number,
    textReview: {type: String, default: ""},
    date: String
});

const ReviewModel = mongoose.model("Review", ReviewSchema);
module.exports = ReviewModel;