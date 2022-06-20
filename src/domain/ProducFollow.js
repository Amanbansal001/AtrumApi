const { attributes } = require('structure');

const ProducFollow = attributes({

  id: { type: Number },
  productId: { type: Number },
  ProducFollowId: { type: Number },
  createdAt: { type: DataTypes.DATE, default: Date.now },
  updatedAt: { type: DataTypes.DATE, default: Date.now },

})(class ProducFollow {

});

module.exports = ProducFollow;
