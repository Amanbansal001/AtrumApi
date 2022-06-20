const { attributes } = require('structure');

const OrderAddress = attributes({

  id: { type: Number },
  userId: { type: Number },
  isDefault: { type: Number },
  shippingType: { type: String },
  isBillingSame: { type: Number },
  name: { type: String },
  addressLine1: { type: String },
  addressLine2: { type: String },
  city: { type: String },
  state: { type: String },
  country: { type: String },
  zipCode: { type: String },
  createdAt: { type: DataTypes.DATE, default: Date.now },
  updatedAt: { type: DataTypes.DATE, default: Date.now },

})(class OrderAddress {

});

module.exports = OrderAddress;
