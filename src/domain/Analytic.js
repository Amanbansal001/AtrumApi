const { attributes } = require('structure');

const Analytic = attributes({

  id: { type: Number },
  userId: { type: Number },
  productId: { type: Number },
  createdAt: { type: DataTypes.DATE, default: Date.now },
  updatedAt: { type: DataTypes.DATE, default: Date.now },

})(class Analytic {

});

module.exports = Analytic;
