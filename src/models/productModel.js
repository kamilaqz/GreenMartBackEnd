const mongoose = require('mongoose')
const Schema = mongoose.Schema

const productSchema = new Schema({
    id: {type: Number, required: true, unique: true, min_length: 3},
    name: {type: String, required: true},
    price: {type: Number, required: true},
    category: {type: String, required: true}
})


module.exports = mongoose.model("ProductModel", productSchema)
