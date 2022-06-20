const { attributes } = require('structure');

const UserCart = attributes({

  id: { type: Number },
  cartId: { type: String },
  userId: { type: Number },
  productId: { type: Number },
  isDeleted: { type: Number },
  qty: { type: Number },
  price: { type: String },
  createdAt: { type: DataTypes.DATE, default: Date.now },
  updatedAt: { type: DataTypes.DATE, default: Date.now },

})(class UserCart {

});

module.exports = UserCart;
