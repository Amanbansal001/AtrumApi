'use strict';

module.exports = function (sequelize, DataTypes) {
  const TrendingArtwork = sequelize.define('trending_artworks', {
    id: { type: DataTypes.INTEGER,autoIncrement: true,primaryKey: true },
    productId: { type: DataTypes.INTEGER },
    month: { type: DataTypes.INTEGER },
    createdAt: { type: DataTypes.DATE, default: Date.now },
    updatedAt: { type: DataTypes.DATE, default: Date.now },

  });

  TrendingArtwork.associate = function (models) {
    TrendingArtwork.belongsTo(models.Product, {foreignKey: 'productId', targetKey: 'id', as: 'arts' });
    TrendingArtwork.belongsTo(models.Wishlist, {foreignKey: 'productId', targetKey: 'productId', as: 'wishlist' });
  }


  return TrendingArtwork;
};
