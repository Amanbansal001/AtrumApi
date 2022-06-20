const { attributes } = require('structure');

const OrderPaymentMethod = attributes({

  id: { type: Number },
  userId: { type: Number },
  isDefault: { type: Number },
  cardType: { type: String },
  name: { type: String },
  cardNumber: { type: String },
  expiryDate: { type: String },
  cvv: { type: String },
  createdAt: { type: DataTypes.DATE, default: Date.now },
  updatedAt: { type: DataTypes.DATE, default: Date.now },

})(class OrderPaymentMethod {

});

module.exports = OrderPaymentMethod;
