const { attributes } = require('structure');

const Order = attributes({

  id: { type: Number },
  orderId: { type: String },
  txnId: { type: String },
  trackingId: { type: String },
  cartId: { type: String },
  OrderId: { type: Number },
  couponId: { type: Number },
  billAddressId: { type: Number },
  shipAddressId: { type: Number },
  paymentMethodId: { type: Number },
  total: { type: String },
  grandTotal: { type: String },
  discountPrice: { type: String },
  orderStatus: { type: String },
  paymentType: { type: String },
  createdAt: { type: DataTypes.DATE, default: Date.now },
  updatedAt: { type: DataTypes.DATE, default: Date.now },

})(class Order {

});

module.exports = Order;
