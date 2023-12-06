const mongoose = require("mongoose");
const {Schema} = mongoose;

const ProductSchema = new Schema({
    title: String,
    detail: String,
    category: String,
    gender: String,
    store: String,
    keywords: String,
    price: Number,
    sizes: [String],
    colors: [String],
    stock: Schema.Types.Mixed,
    photos: [String],
    rate: Number,

});

const ProductModel = mongoose.model("Product", ProductSchema);
module.exports = ProductModel;