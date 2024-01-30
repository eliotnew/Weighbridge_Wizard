const mongoose = require("mongoose");
//I need to figure out what types of trucks can take what types of product
const productSchema = new mongoose.Schema({
  product: {
    type: String,
    required: true,
  },
  compatible: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
});

const productModel = mongoose.model("Product", productSchema);

module.exports = productModel;
