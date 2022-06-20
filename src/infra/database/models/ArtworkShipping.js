'use strict';

module.exports = function (sequelize, DataTypes) {
  const ArtworkShipping = sequelize.define('artwork_shippings', {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    productId: { type: DataTypes.INTEGER },
    fromCity: { type: DataTypes.STRING },
    toCity: { type: DataTypes.STRING },
    price: { type: DataTypes.STRING },
    createdAt: { type: DataTypes.DATE, default: Date.now },
    updatedAt: { type: DataTypes.DATE, default: Date.now },

  });

  return ArtworkShipping;
};
