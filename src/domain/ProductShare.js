const { attributes } = require('structure');

const ProductShare = attributes({

  id: { type: Number },
  productId: { type: Number },
  userId: { type: Number },
  createdAt: { type: DataTypes.DATE, default: Date.now },
  updatedAt: { type: DataTypes.DATE, default: Date.now },

})(class ProductShare {

});

module.exports = ProductShare;
