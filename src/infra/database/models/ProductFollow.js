'use strict';

module.exports = function (sequelize, DataTypes) {
  const ProductFollow = sequelize.define('product_follows', {
    id: { type: DataTypes.INTEGER,autoIncrement: true,primaryKey: true },
    productId: { type: DataTypes.INTEGER },
    userId: { type: DataTypes.INTEGER },
    createdAt: { type: DataTypes.DATE, default: Date.now },
    updatedAt: { type: DataTypes.DATE, default: Date.now },

  });

  return ProductFollow;
};
