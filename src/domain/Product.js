const { attributes } = require('structure');

const Product = attributes({
  id: { type: Number },
  userId: { type: Number },
  categoryId: { type: Number },
  publishYear: { type: String },
  productName: { type: String },
  productDescription: { type: String },
  productImage: { type: String },
  price: { type: String },
  shippingInfo: { type: String },
  collection: { type: String },
  medium: { type: String },
  signature: { type: String },
  certificateAuth: { type: String },
  frame: { type: String },
  createdAt: { type: DataTypes.DATE, default: Date.now },
  updatedAt: { type: DataTypes.DATE, default: Date.now },
})(class Product {

});

module.exports = Product;
