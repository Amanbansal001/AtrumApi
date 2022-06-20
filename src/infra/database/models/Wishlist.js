'use strict';

module.exports = function (sequelize, DataTypes) {
  const Wishlist = sequelize.define('wishlists', {
    id: { type: DataTypes.INTEGER,autoIncrement: true,primaryKey: true },
    productId: { type: DataTypes.INTEGER },
    userId: { type: DataTypes.INTEGER },
    createdAt: { type: DataTypes.DATE, default: Date.now },
    updatedAt: { type: DataTypes.DATE, default: Date.now },

  });

  return Wishlist;
};
