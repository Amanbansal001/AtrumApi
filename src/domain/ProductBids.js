const { attributes } = require('structure');

const ProductBids = attributes({

  id: { type: Number },
  userId: { type: Number },
  productId: { type: Number },
  name: { type: String },
  country: { type: String },
  addressLine1: { type: String },
  addressLine2: { type: String },
  city: { type: String },
  state: { type: String },
  zipCode: { type: String },
  phone: { type: String },
  bidStatus: { type: String },
  createdAt: { type: DataTypes.DATE, default: Date.now },
  updatedAt: { type: DataTypes.DATE, default: Date.now },

})(class ProductBids {

});

module.exports = ProductBids;
