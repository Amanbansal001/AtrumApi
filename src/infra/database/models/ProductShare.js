'use strict';

module.exports = function (sequelize, DataTypes) {
  const ProductShare = sequelize.define('product_shares', {
    id: { type: DataTypes.INTEGER,autoIncrement: true,primaryKey: true },
    productId: { type: DataTypes.INTEGER },
    userId: { type: DataTypes.INTEGER },
    createdAt: { type: DataTypes.DATE, default: Date.now },
    updatedAt: { type: DataTypes.DATE, default: Date.now },
  });

  return ProductShare;
};
